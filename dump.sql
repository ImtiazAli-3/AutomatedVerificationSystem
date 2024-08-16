CREATE DATABASE  IF NOT EXISTS `ecomm` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ecomm`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: ecomm
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `basket`
--

DROP TABLE IF EXISTS `basket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `basket` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `item_id` int NOT NULL,
  `quantity` int DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `basket_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `basket_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basket`
--

LOCK TABLES `basket` WRITE;
/*!40000 ALTER TABLE `basket` DISABLE KEYS */;
INSERT INTO `basket` VALUES (48,5,7,1),(49,5,36,1),(50,5,36,1),(51,5,23,3),(52,5,23,3),(53,5,23,3),(54,5,22,2),(60,4,14,1),(61,4,11,2),(62,4,3,1),(64,4,15,1),(72,6,18,1),(73,6,16,1),(74,6,7,1),(75,6,27,1),(76,6,15,1);
/*!40000 ALTER TABLE `basket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failedlistings`
--

DROP TABLE IF EXISTS `failedlistings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failedlistings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `material` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `seller_id` int DEFAULT NULL,
  `verification_attempts` int DEFAULT '1',
  `moderated` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failedlistings`
--

LOCK TABLES `failedlistings` WRITE;
/*!40000 ALTER TABLE `failedlistings` DISABLE KEYS */;
INSERT INTO `failedlistings` VALUES (45,'AZUR LANE BELFAST 1/7 SCALE','Pre-Painted Scale Figure of Belfast from Azur Lane',375.00,'240mm','EMONTOYS','PVC','Figures','image-1713826790727.jpg',4,1,0,'2024-04-22 22:59:53'),(63,'Tokyo Ghoul - Ken Kaneki 1/8 Scale ARTFX J Figure ','Tokyo Ghoul - Ken Kaneki 1/8 Scale ARTFX J Figure (AWAKENED Repaint Ver.) (Re-run)',200.00,'8.5 Inches','Kotobukiya','PVC/ABS','Figures','image-1714480484353.jpeg',6,1,0,'2024-04-30 12:34:45'),(94,'HONKAI: STAR RAIL MARCH 7TH CLOTHING IMPRESSION SERIES JACKET','HONKAI: STAR RAIL MARCH 7TH CLOTHING IMPRESSION SERIES JACKET\r\nSeries: Honkai: Star Rail\r\nCopyright © COGNOSPHERE. All Rights Reserved',280.00,'S','Cognosphere','Polyster/Cotton','Clothes','image_1715077034108_sr.jpg',6,2,0,'2024-05-07 10:17:16');
/*!40000 ALTER TABLE `failedlistings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `size` varchar(255) DEFAULT NULL,
  `material` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `seller_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_seller` (`seller_id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'Godzilla vs Evangelion - Type-3 Kiryu EVA Unit-01 Color Ver. Model Kit','Since Hideaki Anno is now director of both the hit Anime \"Evangelion\" and \"Shin Godzilla\" welcome this dream-like collaboration project \"Godzilla vs. Evangelion\".Thanks to being a hot topic within this project the \"Type-3 Kiryu EVA Unit-01 Color Ver.\" is now here as a pre-colored plastic model.The machine body combines the Type-3 Kiryu from 2002 released \"Godzilla x Mechagodzilla\" with the mainly purple EVA Unit-01s image coloring.Each part is made into a mold according to the color of the design.It only needs to be assembled to recreate in high detail the Kiryu Unit-01 color.Also, it is the snap-together type so no glue is needed for this fully recreated poseable kit.',165.00,'9.5 inches','ABS/PVC','figures','1.jpg','EVA GLOBAL',NULL),(2,'Tengen Uzui The City Where Demons Dwell Ver Demon Slayer Ichiban Figure','Bandai Spirits Ichibansho is proud to announce their newest release Tengen Uzui (The city where demons dwell)! This statue is expertly crafted and meticulously sculpted to look like Tengen Uzui from Demon Slayer. Standing at approximately 5.9“ tall, Tengen Uzui is seen in their popular pose. Be sure to collect this and enhance your display with other incredible Ichibansho figures!',58.00,'5.9 inches tall','PVC/ABS','figures','2.jpg','Bandai Spirits',NULL),(3,'Chainsaw Man - Chainsaw Man Pop Up Parade Figure (Battle Damaged Ver.)','A New Addition to the POP-UP PARADE! POP UP PARADE is a series of figures that are easy to collect with affordable prices and quick releases! Each figure typically stands around 17-18cm in height and the series features a vast selection of characters from popular anime and game series, with many more to be added soon!',31.99,'7.2 inches','PVC','figures','3.jpg','Good Smile Company',NULL),(4,'Elias Ainsworth Season 2 Ver The Ancient Magus Bride Large Pop Up Parade Figure','A New Addition to the POP UP PARADE lineup comes a new Large figure featuring Elias Ainsworth from The Anicent Magus Bride!',60.99,' 9.5 inches tall','PVC','figures','4.jpg','Good Smile Company',NULL),(5,'Guts Berserker Armor Ver Berserk Bust','The Berserker Armor in bust statue form!\n\nFrom the popular series \"Berserk\" comes a bust statue figure of Guts wearing the Berserker Armor.\n\nThe production of the figure has been completely reviewed and approved by Studio Gaga. The figure features Guts in his berserker state, od flowing from his body. The od effect parts are created with the use of translucent parts.\n\nEnjoy Guts awe-inducing appearance in figure form!',52.99,'','','figures','5.jpg','',NULL),(6,'Jujutsu Kaisen - Tokyo Jujutsu High School Bomber Jacket','Officially licensed',90.00,'S','Mixed','clothes','6.jpg','',NULL),(7,'My Hero Academia x Hyperfly x NBA - Boston Celtics All Might T-Shirt','This Limited Edition collaboration gets nothing but net! Break all the fashion records with this Hyperfly × MHA × NBA Boston Celtics All Might T-shirt. You’d be lucky to add this mashup of anime and Boston pride to your closet, so don’t sleep on this collab. Score one for yourself today!',60.00,'XL','Cotton','clothes','7.jpg','',NULL),(8,'One Piece - Law Icon Hoodie','This Limited Edition collaboration gets nothing but net! Break all the fashion records with this Hyperfly × MHA × NBA Boston Celtics All Might T-shirt. You’d be lucky to add this mashup of anime and Boston pride to your closet, so don’t sleep on this collab. Score one for yourself today!',65.00,'XS','Cotton','clothes','8.jpg','',NULL),(9,'One Piece - Roronoa Zoro Pirate Hunter Hoodie ','',50.00,'L','Polyster','clothes','9.jpg','',NULL),(10,'Jujutsu Kaisen - Gojo Crossed Arms Hoodie','',55.00,'M','','clothes','10.jpg','',NULL),(11,'Spy x Family - Tamagotchi: Anya Spy Green','In this Spy x Family and Tamagotchi collaboration, you can play with and take care of Anya! Depending on how you take care of Anya in her uniform, you may be able to see various outfit styles and facial expressions. You can feed Anya stew and her favorite food, peanuts! There are three mini games you can play with her including dodgeball, and a word matching game. You can see scenes from the series and see other characters appear! If Anya is not well taken care of, she will sulk and run away. This style features a spy green shell with a decorative design of Loid, Yor, and Anya Foger. You can also check out the other design in this collection featuring an Anyatchi pink shell with a nod to Anya’s hair accessory. Batteries (LR44x2) included. For Ages 8+.',24.99,'2 inches tall','Plastic','household','11.jpg','Bandai Namco',NULL),(12,'Itsukushima Shrine Sights to See Series Nanoblock','Itsukushima Shrine from Nanoblock Sight to See Series stands approximately 2.55″ tall and has 540 pieces. Difficulty level is 2. This kit features all the details one would expect and is fun to build!',17.99,'Approx 2.6 inches tall','ABS','household','12.jpg','Bandai',NULL),(13,'Kunai Naruto Shippuden 3D Mug','With its handle in the shape of a Kunai, this 16oz Naruto Shippuden mug is perfect for you to drink your favorite beverage while also paying homage to the Konoha ninjas.',19.99,'Approx 4 inches tall','Ceramic','household','13.jpg',NULL,NULL),(14,'ShitaukenoNeko - Beckoning Cat Shelf','Here, kitty, kitty! This Beckoning Cat Figure is purr-fect for holding things. Legend has it that a beckoning cat figurine brings good luck, but with this mischievous face, who knows what kind of luck you might get? Maybe a sudden influx of catnip mice, or perhaps a string of yarn mysteriously unraveled from your favorite sweater.',61.99,'Approx 9.1 inches tall','Painted polystone','household','14.jpg','Shenzhen Mabell',NULL),(15,'My Neighbor Totoro - Totoro Traditional Japanese Small Bowl','Perfect for enjoying a warm bowl of soup with the iconic Totoro in a Japanese motif. Dishwasher friendly, not for oven or microwave.',10.95,'approximately 4.3 × 2.7 inches','ABS Resin','household','15.jpg',NULL,NULL),(16,'Evangelion - Dreaming Pot Blind Minature','Is this finally proof that things get exponentially cuter when you put them in adorable containers? Yes. Yes, it is. Add a splash of cuteness to your favorite Evangelion collection with this Dreaming Pot Blind miniature. Which one will you get? Lineup: Shinji Ikari, Rei Ayanami, Asuka Shikinami Langley, Mari Makinami Illustrious, Kaworu Nagisa.',14.99,'Approx 4.5 inches tall','ATBC-PVC ABS Acrylic','accessories','16.jpg','Re-Ment',NULL),(17,'Spy x Family - Anya Collection 2 Shokugan Mascot Keychain Blind Box','From the new smash hit anime SPY x FAMILY comes a Anya mascot collection. Collect 10 types of Anya in various costumes with 1 of the 10 being a secret costume!',5.99,'Approx 2 inches tall','PVC Metal Ball Chain','accessories','17.jpg','Bandai',NULL),(18,'Ponyo - Jellyfish Ponyo Keychain','Original Studio Ghibli Jellyfish Ponyo key chain/strap/Bag charm of Ponyo. Originality is confirmed by the special sticker.',13.99,'Approx 1.2 inches tall','PVC Metal Chain','accessories','18.jpg','Benelic',NULL),(19,'Attack on Titan - Eren Yeager Watch','It\'s time to let Eren Yeager inspire every moment of your day with this official Attack on Titan Eren Yeager Watch! Featuring a design inspired by Eren\'s iconic outfit, this watch is perfect for any fan of the series. Keep track of time and stay motivated to fight for your freedom with this timepiece inspired by the series\' protagonist.',70.00,NULL,NULL,'accessories','19.jpg',NULL,NULL),(20,'Frieren: Beyond Journey\'s End Manga Volume 11','Frieren: Beyond Journey\'s End manga volume 11 features story by Kanehito Yamada and art by Tsukasa Abe. Frieren and her companions are separated...',9.59,NULL,NULL,'mangas','20.jpg',NULL,NULL),(21,'Kaiju No. 8 Exclusive Edition Manga Volume 1','Kaiju No. 8 Manga Volume 1 features story and art by Naoya Matsumoto and this limited edition features exclusive cover artwork! Kafka wants to clean up kaiju...',9.59,NULL,NULL,'mangas','21.jpg',NULL,NULL),(22,'Solo Leveling Manhwa Volume 9 (Color)','Solo Leveing Manhwa Volume 9 features story by Chugong and art by DUBU. Seeking answers, Jinwoo answers the call of the system and returns to the double dungeon...',11.59,NULL,NULL,'mangas','22.jpg',NULL,NULL),(23,'Tokyo Revengers: A Letter from Keisuke Baji Manga Volume 1','Tokyo Revengers: A Letter from Keisuke Baji Manga Volume 1 features story by Ken Wakui and art by Yukinori Natsukawaguchi. The Tokyo Manji motorcycle gang...',11.99,NULL,NULL,'mangas','23.jpg',NULL,NULL),(24,'Spy x Family Manga Volume 12','Spy × Family manga volume 12 features story and art by Tatsuya Endo.\n\nAnya’s friendship scheme seems to be taking a turn for the better in the aftermath of the failed hijacking. Meanwhile, Operation Strix and Loid’s true identity are in danger—a mole has been uncovered, but not before they went underground!',9.59,NULL,NULL,'mangas','24.jpg',NULL,NULL),(25,'One piece - String Short Sleeve T-Shirt','Dondada! Master the art of puppetry with this String String Fruit tee. It’ll make you feel like you have strings of confidence that dance across your chest, manipulating fashion trends!',30.00,'L','100% Cotton','Clothes','25.jpg','One Piece',4),(26,'Dragon Ball Z - Super Saiyan Trunks Figuarts Figure','This fixed-pose figure captures the climactic moment of Trunks\' battle with Mecha Frieza, complete with both slashing effect and Mecha Frieza\'s severed body rendered in three dimensions!',100.00,'11 inches','PVC/ABS','Figures','26.jpg','Dragon Ball Z',4),(27,'Attack on Titan x Color Bars - Loaded Logo Hoodie','Get ready for the Attack on Titan Final Season with this Loaded hoodie. It’s a subtle but significant design that gives you just a glimpse of the action without spoiling anything. So, load up on this Attack on Titan × Color Bars collab and give your wardrobe a lift.',70.00,'M','60% Cotton/40% Polyester','Clothes','27.jpg','Attack on Titan',4),(34,'Evangelion - Evangelion Unit-01 Alloy Action Figure (Final Model Ver.)','Faithfully recreating the distinctive form of the Final Model, this figure incorporates alloy parts throughout, achieving a robust and weighty finish. Its articulated joints, replicating human skeletal and muscular movements, ensure a wide range of motion with natural fluidity. Additionally, iconic armaments such as the Power 8, Magoroku Exterminate Sword, and Lucretius Spear are all included!',412.00,'11.4 ','PVC/ABS Mix','Figures','34.jpg','CCSTOYS',4),(35,'Cat-Eyed Boy x Deadmau5 Knithead Sweater','Looking for the purrfect collaboration? Check out this electrifying mashup between Cat-Eyed Boy and Deadmau5. This stylish knithead sweater is the perfect way to show off your love for both anime and electronic music while keeping you warm during those chilly nights.',75.00,'S','Cotton ','Clothes','35.jpg','Cat-Eyed Boy x Deadmau5',4),(36,'The World After the Fall Manhwa Volume 1','A new series from the creative team behind Omniscient Reader. A tower one day appeared in the skies, standing out as a beacon of chaos and apocalypse. A heroic and powerful lot known as Walkers cleared the tower floors in order to save humanity, until the day that the Stone of Regression was discovered. Walkers could now “return” to the past, and slowly, everyone left. The brave few who remained formed Carpe Diem, a group of people who refused to abandon the world and represented humanity’s last hope. But once the last Walker reached floor 100, he no longer knew what to believe.',16.00,'','','Mangas','36.jpg','',4),(37,'The World After the Fall Manhwa Volume 2','After his harrowing ordeal in the Nightmare Tower, what awaits Jaehwan is Chaos, a vast realm populated with strange people and even stranger beasts. Adding to the confusion is the fact that, to his Awakened eyes, the world appears radically different from how everyone else sees it.... But one thing remains the same—Jaehwan will never walk any path other than the one he cut with his own hands.',16.00,'','','Mangas','37.jpg','',4),(38,'The World After the Fall Manhwa Volume 3','Jaehwan attempts to save Mino’s rapidly deteriorating soul...only to be sucked into a bizarre dimension! Before he can get his bearings, he encounters a strange old man—for the first time, Jaehwan faces an opponent who has also attained Awakening! Is the mysterious swordmaster a friend or an enemy? Only one way to find out!',16.00,'','','Mangas','38.jpg','',4),(39,'The World After the Fall Manhwa Volume 4','A great deal has changed since Jaehwan’s battle with Catastrophe, but his goal remains the same—form the second Abyss Expedition! In order to do so, he will need to gather the strongest warriors in Chaos, and what better way to gauge their skills than cross blades with them himself?',16.00,'','','Mangas','39.jpeg','',4),(41,'Solo Leveling Manhwa Volume 7 (Color)','The Jeju Island raid is underway, and the elite team of Korean hunters has finally come face-to-face with the ant queen! Soon, Jeju Island would be theirs to reclaim from the magic beasts after four long years—or so they thought. Little did they know that her strongest soldier would be unlike any magic beast they’d ever fought before!',16.00,'','','Mangas','41.jpg','',4),(42,'One Piece - Gum Gum Devil Fruit Sweater','Stretch your style to new heights with the Gum Gum Devil Fruit Sweater! Channel your inner Monkey D. Luffy and show the world you\'re incredibly flexible. Just don\'t get too carried away trying to reach that One Piece!',55.00,'XS','cotton','Clothes','42.jpg','One Piece',4),(67,'Frieren: Beyond Journey\'s End Manga Volume 11','Frieren: Beyond Journey\'s End Manga Volume 11',10.00,'','','Mangas','67.jpeg','',4),(68,'Chainsaw Man Manga Volume 16','Chainsaw Man Manga Volume 16',10.00,'','','Mangas','68.jpg','',4),(69,'Spy x Family - Bond Preciality Plush','Spy x Family - Bond Preciality Plush',30.00,'8 inches','Polyster','Household','69.jpeg',NULL,4),(70,'Spy x Family - Bond Preciality Plush','Spy x Family - Bond Preciality Plush',30.00,'8 inches','Polyster','Household','70.jpg',NULL,4),(71,'ULTRA INSTINCT GOKOU ZIP HOODIE BLACK SMALL','ULTRA INSTINCT GOKOU ZIP HOODIE BLACK ',105.00,'S','Cotton','Clothes','71.jpg','Cospa',6),(72,'AZUR LANE BELFAST 1/7 SCALE','Pre-Painted Scale Figure of Belfast from Azur Lane',226.00,'240mm','PVC','Figures','72.jpg','EMONTOYS',4),(74,'Attack on Titan x Color Bars - Destroy T-Shirt','Attack on Titan x Color Bars - Destroy T-Shirt red tee',32.00,'M','Cotton','Clothes','image-74.jpg','Attack on Titan',6),(76,'Tokyo Ghoul - Ken Kaneki 1/8 Scale ARTFX J Figure (AWAKENED Repaint Ver.) (Re-run)','Tokyo Ghoul - Ken Kaneki 1/8 Scale ARTFX J Figure (AWAKENED Repaint Ver.) (Re-run)',800.00,'8.5 Inches','PVC/ABS','Figures','76.jpeg','Kotobukiya',6),(94,'Godzilla x Kong: The New Empire Ichibansho - Godzilla Figure (Evolved Ver.)','Godzilla x Kong: The New Empire Ichibansho - Godzilla Figure (Evolved Ver.)\r\nThis Godzilla figure from “Godzilla x Kong: The New Empire” is here to claim its throne as the king of your collection… and this time, it’s evolved! Get ready to rumble with history’s most iconic monster as he appears in the latest movie. ',115.00,'8.7 Inches','PVC Plastic','Figures','94.jpg','Bandai Spirits',6);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `item_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (7,8,34,1),(8,8,26,1),(9,8,12,1),(10,8,13,1),(11,8,7,1),(12,8,42,1),(13,8,22,1),(14,8,38,1),(15,8,37,1),(16,9,8,1),(17,9,10,1),(18,9,6,1),(19,9,13,1),(20,9,19,1),(21,9,12,1),(22,10,18,1),(23,10,19,1),(24,10,13,1),(25,10,11,1),(26,10,9,1),(27,10,35,1),(28,10,10,1);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) NOT NULL,
  `user_address` text NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` varchar(100) DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (8,'test@gmail.com','123 Tester',855.28,'Pending','2024-04-21 19:05:45'),(9,'test@gmail.com','123 Tester',386.58,'Pending','2024-04-22 18:55:02'),(10,'demo@gmail.com','Demo Road',375.76,'Pending','2024-04-22 21:32:16');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scraped_data`
--

DROP TABLE IF EXISTS `scraped_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scraped_data` (
  `failedlisting_id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `price` float DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `material` varchar(255) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`failedlisting_id`),
  CONSTRAINT `scraped_data_ibfk_1` FOREIGN KEY (`failedlisting_id`) REFERENCES `failedlistings` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scraped_data`
--

LOCK TABLES `scraped_data` WRITE;
/*!40000 ALTER TABLE `scraped_data` DISABLE KEYS */;
INSERT INTO `scraped_data` VALUES (94,'-PRE ORDER- Honkai: Star Rail March 7th Clothing Impression Series Jacket [S Size]','Material: Polyester, Cotton',169.99,NULL,'miHoYo',NULL,NULL,'https://www.kaika.com.au/assets/full/MHY11459.jpg?20240503141232','2024-05-07 10:17:36');
/*!40000 ALTER TABLE `scraped_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `address` varchar(255) DEFAULT NULL,
  `post_code` varchar(50) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `role` enum('customer','admin') NOT NULL DEFAULT 'customer',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `lastname` (`lastname`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'test@gmail.com','Test','123','$2a$10$854H9ZRJrNyeZYTCNEAv.uQLWY20fxvb1Bghx0KjphvhfLI1X6sMy','2024-04-18 00:27:28','123 Tester','TES 123','Test Town','customer'),(5,'adminaccount@gmail.com','Admin','Account','$2a$10$FaX.986RReYTJre2ZX9NauUJ21pV4V3./U9rQavLsDwWQBwK0Kp6W','2024-04-18 00:49:28','','','','admin'),(6,'demo@gmail.com','Demo','Nstration','$2a$10$aocpTkiOIdam/OoiwJYpVegKOcC7Gk5KxlicU3GYCrhO0v7lhXWvu','2024-04-22 21:29:56','Demo Road','DMO','London','customer');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-07 11:55:23
