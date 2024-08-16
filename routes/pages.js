const express = require('express');
const db = require('../config/database');
const mysql = require('mysql2/promise');
const router = express.Router();
const { fetchItemById, fetchItemsByCategory } = require('./itemService');
const path = require('path');
const fs = require('fs');
//routes for pages in the site.
router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/service', (req, res) => {
  res.render('service');
});

router.get('/contact', (req, res) => {
  res.render('contact');
});

router.get('/term', (req, res) => {
  res.render('term');
});

router.get('/sellitem', (req, res) => {
  res.render('sellitem');
});

//category route, gets the items by the category and displays it in the category page
//contains sorting and filter logic, where you can filter and sort by parameters
router.get('/category/:categoryName', async (req, res) => {
  const categoryName = req.params.categoryName;
  const { sort, manufacturer } = req.query;

  try {
      let query = 'SELECT * FROM items WHERE category = ?';
      const params = [categoryName];
      
      if (manufacturer && manufacturer !== '') {
          query += ' AND manufacturer = ?';
          params.push(manufacturer);
      }

      // Sorting logic
      switch (sort) {
          case 'name_asc':
              query += ' ORDER BY name ASC';
              break;
          case 'name_desc':
              query += ' ORDER BY name DESC';
              break;
          case 'price_asc':
              query += ' ORDER BY price ASC';
              break;
          case 'price_desc':
              query += ' ORDER BY price DESC';
              break;
          default:
              break;
      }

      const [items] = await db.execute(query, params);

      const [manufacturers] = await db.execute(
          'SELECT DISTINCT manufacturer FROM items WHERE category = ? ORDER BY manufacturer',
          [categoryName]
      );
      res.render('category', {
          title: categoryName,
          items: items,
          manufacturers: manufacturers,
          selectedManufacturer: manufacturer || '',
          currentSort: sort || ''
      });
  } catch (err) {
      console.error('Error occurred:', err.message);
      console.error(err.stack);
      res.status(500).send('Server error');
  }
});
//get item router, gets all similar items based on categories in the product page
router.get('/item/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const itemDetails = await fetchItemById(itemId);

    if (itemDetails) {
      const similarItems = await fetchItemsByCategory(itemDetails.category, itemId);
      res.render('item', { item: itemDetails, similarItems: similarItems });
    } else {
      res.status(404).send('Item not found');
    }
  } catch (err) {
    console.error('Error occurred:', err.message);
    res.status(500).send('Server error');
  }
});
//the account page contains all their information, their address and email, exisiting listings, failed listings
//they must be logged in to access this
router.get('/account', async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.redirect('/login');
  }

  try {
    const userId = req.user.id;
    const userQuery = 'SELECT email, name, lastname, address, post_code, city FROM users WHERE id = ?';
    const [user] = await db.query(userQuery, [userId]);

    const itemsQuery = 'SELECT * FROM items WHERE seller_id = ?';
    const [items] = await db.query(itemsQuery, [userId]);

    const pendingQuery = 'SELECT * FROM failedlistings WHERE seller_id = ? AND moderated = FALSE';
    const [pendingItems] = await db.query(pendingQuery, [userId]);


    res.render('account', {
      user: user[0],
      items: items || [],
      pendingItems: pendingItems,
      query: req.query
    });

  } catch (err) {
    console.error("Error in /account route:", err);
    res.status(500).send('Server error');
  }
});
//admin dashbaord site, accessed through usual login, but header changes to allow admin functionality
//admin can access each item and then perform actions neccessary
router.get('/dashboard', async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).send('Access Denied');
}
try {
  const itemsQuery = 'SELECT * FROM items';
  const [items] = await db.query(itemsQuery);
    res.render('dashboard', {
        items: items || []
    });
} catch (error) {
    console.error('Error in admin dashboard route:', error);
    res.status(500).send('Internal Server Error');
}
});
//search function used to refine the items in the dashboard
router.get('/dashboard/search', async (req, res) => {
  const searchTerm = req.query.q;
  console.log('Received search term:', searchTerm); // Debugging log
  if (!searchTerm) {
    console.log('No search term provided');
    return res.json([]);
  }
  try {
    // Updated query to search across multiple fields
    const query = `
      SELECT * FROM items 
      WHERE name LIKE ? OR 
            manufacturer LIKE ? OR 
            category LIKE ? OR 
            id LIKE ?
    `;
    const wildcardSearchTerm = `%${searchTerm}%`;
    const searchParams = [wildcardSearchTerm, wildcardSearchTerm, wildcardSearchTerm, wildcardSearchTerm];

    // Execute the query with the search parameters for each field
    const [searchResults] = await db.execute(query, searchParams);
    console.log('Search results:', searchResults); // Debugging log
    res.json(searchResults);
  } catch (error) {
    console.error('Error during item search:', error);
    res.status(500).json({ error: 'Error performing search' });
  }
});

//function to delete items when clicked from the dashboard, in case of any items in baskets, it also deletes them

router.get('/admin/items/delete/:id', async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).send('Access Denied');
    }

    const itemId = req.params.id;

    if (!itemId) {
        return res.status(400).send('Invalid item ID');
    }

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction(); 

        await connection.query('DELETE FROM items WHERE id = ?', [itemId]);
        await connection.query('DELETE FROM basket WHERE item_id = ?', [itemId]);

        await connection.commit(); // Commit
        res.redirect('/dashboard?success=Item deleted successfully');
    } catch (error) {
        await connection.rollback(); // Rollback 
        console.error('Failed to delete item:', error);
        res.status(500).send('Failed to delete item');
    } finally {
        connection.release();
    }
});

// Display edit item form, admins can edit user items and then submit them back into the items table
router.get('/admin/items/edit/:id', async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
      return res.status(403).send('Access Denied');
  }

  const itemId = req.params.id;

  try {
      const [items] = await db.query('SELECT * FROM items WHERE id = ?', [itemId]);
      if (items.length) {
          res.render('edititem', { item: items[0] });
      } else {
          res.status(404).send('Item not found');
      }
  } catch (error) {
      console.error('Failed to fetch item for editing:', error);
      res.status(500).send('Error fetching item');
  }
});
// Process edit item form submission, the post method for the form. takes the form info even if unchanged and updates
router.post('/admin/items/edit/:id', async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
      return res.status(403).send('Access Denied');
  }

  const itemId = req.params.id;
  const { name, description, price, category, size, material, manufacturer } = req.body;  // Extract other fields as needed

  try {
      await db.query('UPDATE items SET name=?, description=?, price=?, category = ?, size =?, material=?, manufacturer=? WHERE id = ?', [name, description, price, category, size, material, manufacturer, itemId]);
      res.redirect('/dashboard?success=Item updated successfully');
  } catch (error) {
      console.error('Failed to update item:', error);
      res.status(500).send('Failed to update item');
  }
});
//admin page for the users of the system. displays all of their information and roles, only 2 roles customer and admin. does not display pwds
router.get('/dashboardusers', async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).send('Access Denied');
}
  try {
    const usersQuery = 'SELECT id, email, name, lastname, city, post_code, address, role FROM users';
    const [users] = await db.query(usersQuery);
    res.render('dashboardusers', { users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Server error');
  }
});
//search function for admin users, can search with name, email, address, city, post code
router.get('/dashboardusers/search', async (req, res) => {
  const searchTerm = req.query.q;
  if (!searchTerm) {
    return res.json([]);
  }

  try {
    const query = `
      SELECT * FROM users 
      WHERE id LIKE ? OR 
            email LIKE ? OR 
            CONCAT(name, ' ', lastname) LIKE ? OR 
            address LIKE ? OR 
            post_code LIKE ? OR 
            city LIKE ?
    `;
    const wildcardSearchTerm = `%${searchTerm}%`;
    const searchParams = [wildcardSearchTerm, wildcardSearchTerm, wildcardSearchTerm, wildcardSearchTerm, wildcardSearchTerm, wildcardSearchTerm];

    const [searchResults] = await db.execute(query, searchParams);
    res.json(searchResults);
  } catch (error) {
    console.error('Error during user search:', error);
    res.status(500).json({ error: 'Error performing search' });
  }
});

//admin function for editing users information, can edit all information
router.get('/admin/users/edit/:id', async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).send('Access Denied');
    }
    const userId = req.params.id;
    const userQuery = 'SELECT * FROM users WHERE id = ?';
    const [user] = await db.query(userQuery, [userId]);
    if (!user || user.length === 0) {
      return res.status(404).send('User not found');
    }
    res.render('edituser', { user: user[0] });
  } catch (error) {
    console.error('Failed to fetch user for editing:', error);
    res.status(500).send('Error fetching user');
  }
});

//post method for the edit users, allows the update of information

router.post('/admin/users/edit/:id', async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).send('Access Denied');
}
const { email, name, lastname, address, post_code, city, role } = req.body;
  try {
    await db.query('UPDATE users SET email = ?, name = ?, lastname = ?, address = ?, post_code = ?, city = ?, role = ? WHERE id = ?', [email, name, lastname, address, post_code, city, role, req.params.id]);
    res.redirect('/dashboardusers');
  } catch (error) {
    console.error('Failed to update user:', error);
    res.status(500).send('Failed to update user');
  }
});

router.get('/admin/users/delete/:id', async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).send('Access Denied');
}
  try {
    await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.redirect('dashboardusers');
  } catch (error) {
    console.error('Failed to delete user:', error);
    res.status(500).send('Failed to delete user');
  }
});
//shows all failed listings from the table that have failed verification twice against the scraped data from the website
//this is displayed in a table and has approve or deny buttons for the admin to select based on their own decision
router.get('/dashboardlistings', async (req, res) => {
  try {
    const [failedListings] = await db.query(`
    SELECT 
        fl.id,
        fl.name AS fl_name,
        fl.description AS fl_description,
        fl.price AS fl_price,
        fl.size AS fl_size,
        fl.manufacturer AS fl_manufacturer,
        fl.material AS fl_material,
        fl.category AS fl_category,
        fl.image AS fl_image,
        fl.seller_id,
        fl.verification_attempts,
        sd.failedlisting_id,
        sd.name AS sd_name,
        sd.description AS sd_description,
        sd.price AS sd_price,
        sd.size AS sd_size,
        sd.manufacturer AS sd_manufacturer,
        sd.material AS sd_material,
        sd.category AS sd_category,
        sd.image AS sd_image
    FROM 
        failedlistings fl
    JOIN 
        scraped_data sd ON fl.id = sd.failedlisting_id
    WHERE 
        fl.verification_attempts = 2
`);
      res.render('dashboardlistings', { failedListings });
  } catch (error) {
      console.error('Error fetching failed listings:', error);
      res.status(500).send('Unable to fetch data');
  }
});

// Route to verify a listing from the approval button in the failedlistings
router.post('/dashboardlistings/verify-listing/:id', async (req, res) => {
  const connection = await db.getConnection(); 
  try {
      const { id } = req.params;
      await connection.beginTransaction();

      const [listingData] = await connection.query('SELECT * FROM failedlistings WHERE id = ?', [id]);
      if (listingData.length === 0) {
        throw new Error('No listing found with the given ID.');
      }
      const listing = listingData[0];

      await connection.beginTransaction();

      // Inserting the verified listing into the items table
      const [insertResult] = await connection.execute(
        'INSERT INTO items (name, description, price, size, manufacturer, material, category, image, seller_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [listing.name, listing.description, listing.price, listing.size, listing.manufacturer, listing.material, listing.category, listing.image, listing.seller_id]
      );
      const newItemId = insertResult.insertId;

      // Renaming the image with the new ID
      const oldImagePath = path.join(__dirname, '..', 'uploads', listing.image);
      const newImagePath = path.join(__dirname, '..', 'uploads', `${newItemId}${path.extname(listing.image)}`);
      const newImageName = newItemId + path.extname(listing.image); 
      fs.renameSync(oldImagePath, newImagePath); 
      
      await connection.execute('UPDATE items SET image = ? WHERE id = ?', [newImageName, newItemId]);
      await connection.query('DELETE FROM scraped_data WHERE failedlisting_id = ?', [id]);
      await connection.query('DELETE FROM failedlistings WHERE id = ?', [id]);
      //delete from failedlistings and scrapeddata so that the information is not appearing again. item is now verified
      await connection.commit();
      res.send('Listing verified and moved successfully');
  } catch (error) {
      await connection.rollback();
      console.error('Error verifying listing:', error);
      res.status(500).send('Failed to verify and move listing');
  } finally {
      connection.release();
  }
});

router.post('/dashboardlistings/reject-listing/:id', async (req, res) => {
  const { id } = req.params;

  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();
    await connection.execute('DELETE FROM scraped_data WHERE failedlisting_id = ?', [id]);
    await connection.execute('DELETE FROM failedlistings WHERE id = ?', [id]);
    await connection.commit();
    //delete both from failed listings and scraped data so that it resemebles failed logic.item has to be reverified later 
    res.send('Listing rejected successfully');
  } catch (error) {
    if (connection) await connection.rollback();

    console.error('Error rejecting listing:', error);
    res.status(500).send('Failed to reject listing');
  } finally {
    if (connection) connection.release();
  }
});


//simple checkout process, no functionality other than a fake submission
router.post('/process-checkout', async (req, res) => {
  if (!req.user) {
    return res.status(401).send('You must be logged in to view this page.');
  }

  // Default values for missing parameters
  const user_email = req.user.email;
  const user_address = req.user.address;
  const total_amount = req.body.total_amount || 0;  // Default to 0 i

    const connection = await db.getConnection();

  try {
    const [orderResult] = await connection.execute(
      'INSERT INTO orders (user_email, user_address, total_amount, status) VALUES (?, ?, ?, ?)',
      [user_email, user_address, total_amount, 'Pending']
    );
    const orderId = orderResult.insertId;

    // Retrieve the user's basket items
    const [basketItems] = await connection.execute(
      'SELECT * FROM basket WHERE user_id = ?',
      [req.user.id]
    );

    // Insert each basket item into the order_items table
    for (const item of basketItems) {
      await connection.execute(
        'INSERT INTO order_items (order_id, item_id, quantity) VALUES (?, ?, ?)',
        [orderId, item.item_id, item.quantity]
      );
    }

    // Clear the user's basket after chekout
    await connection.execute('DELETE FROM basket WHERE user_id = ?', [req.user.id]);

    await connection.commit(); 

    res.redirect(`/orders`);
  } catch (error) {
    await connection.rollback();
    console.error('Failed to process order:', error);
    res.status(500).send('Failed to process your order.');
  } finally {
    connection.release(); 
  }
});
//gets all of the users orders after checking out. displays all of the information, including each itempurcchased, purchase data, and grand total
router.get('/orders', async (req, res) => {
  if (!req.user) {
    return res.status(401).send('You must be logged in to view this page.');
  }
  try {
    const [orders] = await db.execute(`
    SELECT o.id, o.total_amount, o.status, o.created_at, 
    GROUP_CONCAT(CONCAT(i.id, ':', i.name) SEPARATOR ',') AS item_details
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN items i ON oi.item_id = i.id
    WHERE o.user_email = ?
    GROUP BY o.id
    ORDER BY o.created_at DESC
    
    `, [req.user.email]);

    res.render('orders', { orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send('Failed to retrieve orders.');
  }
});
//createa a simple search functionality based on the items name, returns a simple page of all items that have lIKE names
router.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.q;
    if (!searchTerm) {
      return res.redirect('/');
    }
    
     //searches on name
    const query = 'SELECT * FROM items WHERE name LIKE ? OR category LIKE ?';
    const wildcardSearchTerm = `%${searchTerm}%`;
    const [searchResults] = await db.execute(query, [wildcardSearchTerm, wildcardSearchTerm]);

    res.render('searchresults', { 
      items: searchResults, 
      title: 'Search Results',
      searchTerm: searchTerm 
    });
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).send('Error performing search');
  }
});
//router method so that the user can select their own item from the drop down and edit it accordingly, then submit back into items table
router.get('/useredititem', async (req, res) => {
  try {
    const seller_id = req.user.id;
    const [items] = await db.execute('SELECT id, name FROM items WHERE seller_id = ?', [seller_id]);
    res.render('useredititem', { items });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

router.get('/user/edit-item', async (req, res) => {
  const item_id = req.query.item_id;
  try {
    const [results] = await db.execute('SELECT * FROM items WHERE id = ?', [item_id]);
    if (results.length > 0) {
      const item = results[0];
      item.price = parseFloat(item.price).toFixed(2); 
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    console.error('Error retrieving item details:', error);
    res.status(500).json({ error: 'Error retrieving item for editing' });
  }
});
//post method to update the users item tables
router.post('/user/update-item', async (req, res) => {
  const { id, name, description, price, size, material, category, manufacturer } = req.body;
  const values = [
    name,
    description,
    price ? parseFloat(price).toFixed(2) : null,
    size,
    material,
    category,
    manufacturer,
    id
  ].map(val => val ?? null); // Convert undefined to null

  try {
    await db.execute(
      'UPDATE items SET name = ?, description = ?, price = ?, size = ?, material = ?, category = ?, manufacturer = ? WHERE id = ?',
      values
    );
    res.send('Item updated successfully');
  } catch (error) {
    console.error('Failed to update item:', error);
    res.status(500).send('Error updating item');
  }
});



module.exports = router;
