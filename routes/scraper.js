require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const db = require('../config/database');
const stringSimilarity = require('string-similarity');
const express = require('express');
const router = express.Router();
const natural = require('natural');
const sharp = require('sharp');
const { imageHash } = require('image-hash');
const uuid = require('uuid');
//classifier path for the pre trained classifier model
const classifierPath = path.join(__dirname, '..', './classifier.json');
let classifier;
natural.BayesClassifier.load(classifierPath, null, function(err, loadedClassifier) {
    if (err) {
        console.error('Error loading classifier:', err);
        return;
    }
    classifier = loadedClassifier;
})
//regex code to just take the number or the text, could be used
const extractNumber = (text) => {
  text = String(text).replace(/,+/g, ''); 
  const matches = text.match(/[0-9.]+/);
  return matches ? parseFloat(matches[0]) : null;
};

const cleanText = (text) => {
  return String(text)
    .toLowerCase() 
    .replace(/^(size:|material:|manufacturer:)\s*/i, '') 
    .replace(/,+/g, '') 
    .trim();
};
//regex to extract the description without any of the other information, material, manufacturer, size etc
const extractDetails = (text, keyword) => {
  for (let keyWord of keyword) {
    const regex = new RegExp(`${keyWord}( approx)?\\s*:\\s*([^,;\\n]+)`, 'i');
    const match = text.match(regex);
    if (match) {
      return match[2].trim().replace(/\n/g, ' '); 
    }
  }
  return '';
};

const extractDescription = (text, keywords) => {
  //regex to find the position of the first keyword
  const regex = new RegExp(`(${keywords.join('|')})`, 'i');
  const match = text.search(regex);
  if (match !== -1) {
    return text.substring(0, match).trim();
  }
  return text; // Return full text if no keywords 
};

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
      console.log(`Directory created at ${dirname}`);
  }
}

//download the scraped image from the website and save it into the location
async function downloadImage(imageUrl, baseOutputPath) {
  const uniqueFilename = `scraped_image_${uuid.v4()}.jpg`;
  const outputPath = path.join(baseOutputPath, uniqueFilename);

  try {
      const response = await axios.get(imageUrl, { responseType: 'stream' });
      const writer = fs.createWriteStream(outputPath);
      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
          writer.on('finish', () => {
              writer.close();
              resolve(outputPath);
          });
          writer.on('error', reject);
      });
  } catch (error) {
      console.error(`Error downloading scraped image: ${error.message}`);
      return null;
  }
}

//process the images to rescale them and greyscale
async function preprocessImage(inputPath) {
  if (!fs.existsSync(inputPath)) {
    console.error(`File does not exist: ${inputPath}`);
    throw new Error(`File does not exist: ${inputPath}`);
  }

  console.log(`Processing image at: ${inputPath}`);
  const outputPath = inputPath.replace(path.extname(inputPath), '-processed' + path.extname(inputPath));
  try {
    await sharp(inputPath)
      .resize(200, 200)
      .grayscale()
      .toFile(outputPath);
    console.log(`Processed image saved to ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error('Error processing the image with Sharp:', error);
    throw error;
  }
}
//Compare the images, increased the threshold and the bits to increase the sensitivity
function compareImages(imagePath1, imagePath2, threshold = 200) {
  return new Promise((resolve, reject) => {
      imageHash(imagePath1, 32, true, (error, data1) => {
          if (error) {
              reject(error);
              return;
          }
          imageHash(imagePath2, 32, true, (error, data2) => {
              if (error) {
                  reject(error);
                  return;
              }
              // Calculate  Hamming distance
              let dist = 0;
              for (let i = 0; i < data1.length; i++) {
                  if (data1[i] !== data2[i]) {
                      dist++;
                  }
              }
              resolve(dist <= threshold);
              console.log(dist);
          });
      });
  });
}

//scrape from a site called kaika, this is different to the other scraper
// take the name, desc, price, manufacturer, image and use them for direct comparison
// take the default search url, and take the name we use for the form and use that as a 
//search term to find the first item in the search bar.
async function scrapeFromKaika(searchTerm) {
  const baseUrl = 'https://www.kaika.com.au';
  const searchUrl = `${baseUrl}/?rf=kw&kw=${encodeURIComponent(searchTerm)}`;
  console.log("Attempting to fetch:", searchUrl);

  try {
      const response = await axios.get(searchUrl);
      const $ = cheerio.load(response.data);
      const firstResultLink = new URL($('div.thumbnail a').attr('href'), baseUrl).href;
      const detailResponse = await axios.get(firstResultLink);
      const detail$ = cheerio.load(detailResponse.data);

      const scrapedName = detail$('h1[itemprop="name"]').text().trim();
      const scrapedManufacturer = detail$('p.manufacturertext a').text().trim();
      const scrapedPrice = parsePrice(detail$('div.productprice').text().trim());
      const scrapedDescription = detail$('div.productdetails').text().trim() || "No description available";

      let imageUrl = detail$('div#_jstl__images img').attr('src');
      if (!imageUrl.startsWith('http')) {
          imageUrl = baseUrl + imageUrl;  // convert to absolute URL
      }

      return {
          name: scrapedName,
          description: scrapedDescription,
          manufacturer: scrapedManufacturer,
          price: scrapedPrice,
          imageUrl: imageUrl
      };
  } catch (error) {
      console.error(`Error scraping Kaika: ${error.message}`);
      return null;
  }
}
//crunchyroll scraper
//same method as the first scraper
//instead, we take the name, description, price, image, (size, material, manufacturer) -> if the last 3 exist
async function scrapeFromCrunchyroll(searchTerm) {
  const baseUrl = 'https://store.crunchyroll.com';
  const searchUrl = `${baseUrl}/search?q=${encodeURIComponent(searchTerm)}`;

  try {
      const searchResponse = await axios.get(searchUrl);
      const search$ = cheerio.load(searchResponse.data);
      const firstResultLink = baseUrl + search$('a.link').first().attr('href');
      const response = await axios.get(firstResultLink);
      const $ = cheerio.load(response.data);

      const detailsText = $('div.short-description').text();
      const sizeKeywords = ['Size', 'Dimension', 'Length','Size approx'];
      const materialKeywords = ['Material', 'Composition','Materials'];
      const manufacturerKeywords = ['Manufacturer', 'Brand', 'Maker'];
      const descriptionKeywords = sizeKeywords.concat(materialKeywords).concat(manufacturerKeywords);
      
      let scrapedName = $('h1.product-name').text().trim();
  
      if (scrapedName.substring(0, scrapedName.length / 2) === scrapedName.substring(scrapedName.length / 2)) {
        scrapedName = scrapedName.substring(0, scrapedName.length / 2).trim();
      }
  
      let scrapedPrice = null;
  
      const salePriceElement = $('span.sales > span.value');
      if (salePriceElement.length > 0) {
          scrapedPrice = parseFloat(salePriceElement.attr('content'));
      } else {
          const originalPriceElement = $('del.strike-through > span.value');
          if (originalPriceElement.length > 0) {
              scrapedPrice = parseFloat(originalPriceElement.attr('content'));
          }
      }
      
      let imageUrl = $('div.easyzoom--overlay:first').find('img').attr('src');
      if (!imageUrl.startsWith('http')) {
          imageUrl = baseUrl + imageUrl;  // Convert to absolute URL
      }
      const actualDescription = extractDescription(detailsText, descriptionKeywords);
      const scrapedSize = extractDetails(detailsText, sizeKeywords);
      const scrapedMaterial = extractDetails(detailsText, materialKeywords);
      const scrapedManufacturer = extractDetails(detailsText, manufacturerKeywords);

      return {
          name: scrapedName,
          description: actualDescription,
          price: scrapedPrice,
          imageUrl: imageUrl,
          size: scrapedSize,
          material: scrapedMaterial,
          manufacturer: scrapedManufacturer
      };
  } catch (error) {
      console.error('Error scraping Crunchyroll:', error);
      return null;
  }
}
//return the values of each scraped item from both of the scrapers, this will be used for the verify
function parsePrice(priceString) {
  return priceString ? parseFloat(priceString.replace(/[^0-9.]/g, "")) : null;
}
//create the verification
// take the form data and take the scraped data as constants and use them to compare against each other
const verifyItem = async (params, scrapedData, basePath) => {
  const { name, price, size, manufacturer, material, description, category: submittedCategory, uploadedImagePath } = params;
  const { name: scrapedName, price: scrapedPrice, size: scrapedSize, material: scrapedMaterial, manufacturer: scrapedManufacturer, imageUrl } = scrapedData;

  // Preprocess and compare images
  const processedUploadedImage = await preprocessImage(uploadedImagePath);
  const scrapedImagePath = await downloadImage(imageUrl, basePath);
  const processedScrapedImage = await preprocessImage(scrapedImagePath);
  const imagesAreSimilar = await compareImages(processedUploadedImage, processedScrapedImage);

  // classify the description to predict the category
  let predictedCategory = null;
  if (classifier && description) {
      predictedCategory = classifier.classify(description).toLowerCase();
      console.log(`Predicted category: ${predictedCategory}`);
  }

  // compare textual and numeric attributes
  const textSimilarityThreshold = 0.6; // Example similarity threshold for text attributes
  const priceDifferenceThreshold = 0.25; // 25% price difference allowed

  let scores = {
      nameSimilar: stringSimilarity.compareTwoStrings(name.toLowerCase(), scrapedName.toLowerCase()) >= textSimilarityThreshold,
      priceSimilar: Math.abs(scrapedPrice - price) / price <= priceDifferenceThreshold,
      sizeSimilar: size && scrapedSize ? size === scrapedSize : true,
      materialSimilar: material && scrapedMaterial ? stringSimilarity.compareTwoStrings(material.toLowerCase(), scrapedMaterial.toLowerCase()) >= textSimilarityThreshold : true,
      manufacturerSimilar: manufacturer && scrapedManufacturer ? stringSimilarity.compareTwoStrings(manufacturer.toLowerCase(), scrapedManufacturer.toLowerCase()) >= textSimilarityThreshold : true,
      imagesAreSimilar: imagesAreSimilar,
      categoryMatch: predictedCategory === submittedCategory.toLowerCase()
  };

  // calculate the overall match percentage
  const totalAttributes = Object.keys(scores).length;
  const matchingAttributes = Object.values(scores).filter(Boolean).length;
  const matchPercentage = matchingAttributes / totalAttributes;

  // determine if the item is verified
  const VERIFIED_THRESHOLD = 0.6; //decided to make an average threshold, anything 60 or more will be verified
  const verified = matchPercentage >= VERIFIED_THRESHOLD; //anything under will be rejected.

  return {
      verified,
      scores,
      reason: verified ? "All attributes match successfully." : "Verification failed due to mismatches.",
      scrapedData
  };
}

module.exports = {
  scrapeFromKaika,
  scrapeFromCrunchyroll,
  verifyItem,
  router };