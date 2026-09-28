-- MySQL dump 10.19  Distrib 8.0.35, for Win64 (x86_64)
--
-- Host: localhost    Database: marketlink_db
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `product_id` bigint(20) unsigned NOT NULL,
  `quantity` int(10) unsigned NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cart_items_user_id_product_id_unique` (`user_id`,`product_id`),
  KEY `cart_items_product_id_foreign` (`product_id`),
  CONSTRAINT `cart_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Fresh Vegetables','fresh-vegetables','carrot',1,'2026-09-24 10:00:28','2026-09-24 10:00:28'),(2,'Seasonal Fruits','seasonal-fruits','apple-alt',1,'2026-09-24 10:00:28','2026-09-24 10:00:28'),(3,'Farm Dairy & Eggs','farm-dairy-eggs','egg',1,'2026-09-24 10:00:28','2026-09-24 10:00:28'),(4,'Herbs & Greens','herbs-greens','leaf',1,'2026-09-24 10:00:28','2026-09-24 10:00:28'),(5,'Honey & Preserves','honey-preserves','jar',1,'2026-09-24 10:00:28','2026-09-24 10:00:28');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `farmer_profiles`
--

DROP TABLE IF EXISTS `farmer_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `farmer_profiles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `market_id` bigint(20) unsigned DEFAULT NULL,
  `farm_name` varchar(255) NOT NULL,
  `stall_number` varchar(255) DEFAULT NULL,
  `farm_address` varchar(255) DEFAULT NULL,
  `farm_latitude` decimal(10,8) DEFAULT NULL,
  `farm_longitude` decimal(11,8) DEFAULT NULL,
  `stall_latitude` decimal(10,8) DEFAULT NULL,
  `stall_longitude` decimal(11,8) DEFAULT NULL,
  `pickup_slots` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`pickup_slots`)),
  `cutoff_hours` int(10) unsigned NOT NULL DEFAULT 4,
  `approval_status` enum('pending','approved','suspended') NOT NULL DEFAULT 'pending',
  `stock_template` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`stock_template`)),
  `bio` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `farmer_profiles_user_id_foreign` (`user_id`),
  KEY `farmer_profiles_market_id_foreign` (`market_id`),
  CONSTRAINT `farmer_profiles_market_id_foreign` FOREIGN KEY (`market_id`) REFERENCES `markets` (`id`) ON DELETE SET NULL,
  CONSTRAINT `farmer_profiles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farmer_profiles`
--

LOCK TABLES `farmer_profiles` WRITE;
/*!40000 ALTER TABLE `farmer_profiles` DISABLE KEYS */;
INSERT INTO `farmer_profiles` VALUES (1,2,1,'Punjab Green Organic Farm','Stall #A-04','Kasur Rural Dist., 32km from Lahore',31.11500000,74.45000000,31.51240000,74.34350000,'[\"08:00 AM - 10:00 AM\",\"10:00 AM - 12:00 PM\",\"12:00 PM - 02:00 PM\"]',4,'approved','[{\"id\":1,\"name\":\"Farm Fresh Vine Tomatoes\",\"price\":140,\"stock_quantity\":60,\"unit\":\"kg\",\"category_id\":1},{\"id\":2,\"name\":\"Organic Red Potatoes\",\"price\":90,\"stock_quantity\":100,\"unit\":\"kg\",\"category_id\":1},{\"id\":3,\"name\":\"Fresh Green Spinach (Palak)\",\"price\":50,\"stock_quantity\":40,\"unit\":\"bunch\",\"category_id\":4},{\"id\":4,\"name\":\"Crunchy Cucumbers (Kheera)\",\"price\":80,\"stock_quantity\":35,\"unit\":\"kg\",\"category_id\":1}]','Growing pesticide-free organic vegetables and fresh root crops for over 15 years.','2026-09-24 10:00:28','2026-09-24 10:00:29'),(2,3,2,'Al-Razaq Pure Dairy & Cattle Farm','Stall #B-12','Sheikhupura Rural Area',31.71300000,73.98500000,31.48220000,74.32240000,'[\"07:30 AM - 09:30 AM\",\"09:30 AM - 11:30 AM\",\"11:30 AM - 01:30 PM\"]',3,'approved',NULL,'Pure unadulterated cow milk, cultured butter, and free-range desi chicken eggs.','2026-09-24 10:00:28','2026-09-24 10:00:28'),(3,4,3,'Sargodha Citrus & Sidr Honey Orchard','Stall #C-08','Bhalwal Citrus Belt, Sargodha',32.08360000,72.67110000,31.46820000,74.39120000,'[\"08:30 AM - 10:30 AM\",\"10:30 AM - 12:30 PM\",\"12:30 PM - 02:30 PM\"]',6,'approved',NULL,'Fresh sweet mandarins, handpicked citrus, and unheated raw Sidr honey.','2026-09-24 10:00:29','2026-09-24 10:00:29'),(4,5,NULL,'Khan Natural Hydroponics','Stall #P-01',NULL,NULL,NULL,NULL,NULL,'[\"09:00 AM - 11:00 AM\"]',4,'pending',NULL,'Hydroponic crisp greens and heirloom berry varieties awaiting verification.','2026-09-24 10:00:29','2026-09-24 10:00:29');
/*!40000 ALTER TABLE `farmer_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favorites` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `farmer_id` bigint(20) unsigned DEFAULT NULL,
  `product_id` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `favorites_user_id_foreign` (`user_id`),
  KEY `favorites_farmer_id_foreign` (`farmer_id`),
  KEY `favorites_product_id_foreign` (`product_id`),
  CONSTRAINT `favorites_farmer_id_foreign` FOREIGN KEY (`farmer_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `favorites_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL,
  CONSTRAINT `favorites_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `markets`
--

DROP TABLE IF EXISTS `markets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `markets` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL DEFAULT 'Lahore',
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `operating_days` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`operating_days`)),
  `opening_time` varchar(255) NOT NULL DEFAULT '08:00 AM',
  `closing_time` varchar(255) NOT NULL DEFAULT '03:00 PM',
  `image_url` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `markets`
--

LOCK TABLES `markets` WRITE;
/*!40000 ALTER TABLE `markets` DISABLE KEYS */;
INSERT INTO `markets` VALUES (1,'Liberty Sunday Farmers Market','Weekly organic and fresh harvest market in the heart of Gulberg.','Liberty Roundabout Park, Gulberg III','Lahore',31.51220000,74.34320000,'[\"Saturday\",\"Sunday\"]','08:00 AM','02:00 PM','https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=600&q=80',1,'2026-09-24 10:00:28','2026-09-24 10:00:28'),(2,'Model Town Organic Bazaar','Fresh vegetables, organic dairy, and seasonal fruits directly from surrounding farms.','Central Park Sports Complex, Model Town','Lahore',31.48200000,74.32200000,'[\"Sunday\"]','07:30 AM','01:30 PM','https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=600&q=80',1,'2026-09-24 10:00:28','2026-09-24 10:00:28'),(3,'DHA Phase 5 Fresh Saturday Market','High-quality local farm produce and specialty organic goods.','Sector C Commercial Area, DHA Phase 5','Lahore',31.46800000,74.39100000,'[\"Saturday\"]','08:30 AM','03:00 PM','https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',1,'2026-09-24 10:00:28','2026-09-24 10:00:28');
/*!40000 ALTER TABLE `markets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2026_09_24_124458_create_personal_access_tokens_table',1),(5,'2026_09_24_124618_create_markets_table',1),(6,'2026_09_24_124619_create_farmer_profiles_table',1),(7,'2026_09_24_124620_create_categories_table',1),(8,'2026_09_24_124621_create_products_table',1),(9,'2026_09_24_124622_create_orders_table',1),(10,'2026_09_24_124623_create_order_items_table',1),(11,'2026_09_24_124624_create_reviews_table',1),(12,'2026_09_24_124625_create_favorites_table',1),(13,'2026_09_24_124626_create_notifications_table',1),(14,'2026_09_24_130000_add_harvested_at_to_products_table',2),(15,'2026_09_25_155000_add_essential_cookie_consent_to_users_table',3),(16,'2026_09_25_205000_add_two_factor_enabled_to_users_table',4),(17,'2026_09_25_210000_add_localization_to_users_table',5),(18,'2026_09_25_160520_create_cart_items_table',6);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `type` varchar(255) NOT NULL,
  `order_id` bigint(20) unsigned DEFAULT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_user_id_foreign` (`user_id`),
  KEY `notifications_order_id_foreign` (`order_id`),
  CONSTRAINT `notifications_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL,
  CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,7,'Order Ready for Pickup!','Your order #ML-260926-4419 is packed and ready at Stall #A-04. Please bring Rs. 460 Cash.','order_ready',2,0,'2026-09-24 10:00:30','2026-09-24 10:00:30'),(2,2,'New Customer Review','Hamza Ali rated your service 5 stars for Order #ML-260921-8821','review_received',1,1,'2026-09-24 10:00:30','2026-09-24 10:00:30');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) unsigned NOT NULL,
  `product_id` bigint(20) unsigned NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `unit` varchar(255) NOT NULL DEFAULT 'kg',
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_order_id_foreign` (`order_id`),
  KEY `order_items_product_id_foreign` (`product_id`),
  CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,1,'Farm Fresh Vine Tomatoes','kg',3,140.00,420.00,'2026-09-24 10:00:30','2026-09-24 10:00:30'),(2,1,2,'Organic Red Potatoes','kg',1,90.00,90.00,'2026-09-24 10:00:30','2026-09-24 10:00:30'),(3,1,3,'Fresh Green Spinach (Palak)','bunch',2,50.00,100.00,'2026-09-24 10:00:30','2026-09-24 10:00:30'),(4,2,1,'Farm Fresh Vine Tomatoes','kg',2,140.00,280.00,'2026-09-24 10:00:30','2026-09-24 10:00:30'),(5,2,2,'Organic Red Potatoes','kg',2,90.00,180.00,'2026-09-24 10:00:30','2026-09-24 10:00:30');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_number` varchar(255) NOT NULL,
  `customer_id` bigint(20) unsigned NOT NULL,
  `farmer_id` bigint(20) unsigned NOT NULL,
  `market_id` bigint(20) unsigned DEFAULT NULL,
  `pickup_date` date NOT NULL,
  `pickup_time_slot` varchar(255) NOT NULL,
  `cutoff_datetime` datetime NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `order_status` enum('placed','accepted','ready_for_pickup','completed','cancelled') NOT NULL DEFAULT 'placed',
  `payment_status` enum('unpaid_cash','paid_cash') NOT NULL DEFAULT 'unpaid_cash',
  `pickup_token` varchar(255) DEFAULT NULL,
  `farmer_notes` text DEFAULT NULL,
  `cancelled_reason` varchar(255) DEFAULT NULL,
  `completed_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orders_order_number_unique` (`order_number`),
  KEY `orders_customer_id_foreign` (`customer_id`),
  KEY `orders_farmer_id_foreign` (`farmer_id`),
  KEY `orders_market_id_foreign` (`market_id`),
  CONSTRAINT `orders_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orders_farmer_id_foreign` FOREIGN KEY (`farmer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orders_market_id_foreign` FOREIGN KEY (`market_id`) REFERENCES `markets` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'ML-260921-8821',6,2,1,'2026-09-21','10:00 AM - 12:00 PM','2026-09-21 06:00:00',610.00,'completed','paid_cash','PK-COMPLETED-1',NULL,NULL,'2026-09-21 10:45:00','2026-09-24 10:00:30','2026-09-24 10:00:30'),(2,'ML-260926-4419',7,2,1,'2026-09-26','10:00 AM - 12:00 PM','2026-09-26 06:00:00',460.00,'ready_for_pickup','unpaid_cash','PK-VERIFY-DEMO',NULL,NULL,NULL,'2026-09-24 10:00:30','2026-09-24 10:00:30');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `farmer_id` bigint(20) unsigned NOT NULL,
  `category_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `unit` varchar(255) NOT NULL DEFAULT 'kg',
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int(11) NOT NULL DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `is_sold_out` tinyint(1) NOT NULL DEFAULT 0,
  `is_temporarily_unavailable` tinyint(1) NOT NULL DEFAULT 0,
  `is_recurring` tinyint(1) NOT NULL DEFAULT 1,
  `harvested_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_farmer_id_foreign` (`farmer_id`),
  KEY `products_category_id_foreign` (`category_id`),
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `products_farmer_id_foreign` FOREIGN KEY (`farmer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,2,1,'Farm Fresh Vine Tomatoes','Naturally vine-ripened red juicy tomatoes, harvested early morning before market.','kg',140.00,60,'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',0,0,1,NULL,'2026-09-24 10:00:29','2026-09-24 10:00:29'),(2,2,1,'Organic Red Potatoes','Unwashed soil-fresh red skin potatoes, perfect for boiling and roasting.','kg',90.00,100,'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80',0,0,1,NULL,'2026-09-24 10:00:29','2026-09-24 10:00:29'),(3,2,4,'Fresh Green Spinach (Palak)','Tender green leaves, washed in clean tube-well water.','bunch',50.00,40,'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80',0,0,1,NULL,'2026-09-24 10:00:29','2026-09-24 10:00:29'),(4,2,1,'Crunchy Cucumbers (Kheera)','Crisp local salad cucumbers, zero bitter taste.','kg',80.00,35,'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=400&q=80',0,0,1,NULL,'2026-09-24 10:00:29','2026-09-24 10:00:29'),(5,3,3,'Pure Fresh Cow Milk','Whole unskimmed raw farm milk chilled immediately after milking.','litre',220.00,50,'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80',0,0,1,NULL,'2026-09-24 10:00:29','2026-09-24 10:00:29'),(6,3,3,'Free-Range Desi Eggs','Brown nutrient-dense eggs from pastured, grain-fed hens.','dozen',360.00,30,'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=400&q=80',0,0,1,NULL,'2026-09-24 10:00:29','2026-09-24 10:00:29'),(7,3,3,'Homemade Cultured Makhan (Butter)','Churned traditionally from cow curd, aromatic and golden.','500g',650.00,15,'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400&q=80',0,0,1,NULL,'2026-09-24 10:00:29','2026-09-24 10:00:29'),(8,4,2,'Sweet Kinnow Mandarins','Export-grade juicy sweet Kinnow from prime Sargodha orchards.','dozen',280.00,50,'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=400&q=80',0,0,1,NULL,'2026-09-24 10:00:29','2026-09-24 10:00:29'),(9,4,5,'Pure Raw Wild Berry (Sidr) Honey','100% natural unfiltered honey harvested directly from wild hives.','500g jar',1200.00,20,'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80',0,0,1,NULL,'2026-09-24 10:00:29','2026-09-24 10:00:29');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviews` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) unsigned NOT NULL,
  `customer_id` bigint(20) unsigned NOT NULL,
  `farmer_id` bigint(20) unsigned NOT NULL,
  `product_id` bigint(20) unsigned DEFAULT NULL,
  `rating` tinyint(3) unsigned NOT NULL,
  `comment` text DEFAULT NULL,
  `farmer_reply` text DEFAULT NULL,
  `replied_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reviews_order_id_unique` (`order_id`),
  KEY `reviews_customer_id_foreign` (`customer_id`),
  KEY `reviews_farmer_id_foreign` (`farmer_id`),
  KEY `reviews_product_id_foreign` (`product_id`),
  CONSTRAINT `reviews_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_farmer_id_foreign` FOREIGN KEY (`farmer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,1,6,2,1,5,'The tomatoes were exceptionally fresh, smelled like a real garden! Very quick pickup at Stall A-04.','Shukriya Hamza bhai! Glad you enjoyed the harvest. We will have fresh spinach again this Sunday!','2026-09-22 15:00:30','2026-09-24 10:00:30','2026-09-24 10:00:30');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `role` enum('admin','farmer','customer') NOT NULL DEFAULT 'customer',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `preferred_country` varchar(10) NOT NULL DEFAULT 'PK',
  `preferred_locale` varchar(10) NOT NULL DEFAULT 'en',
  `two_factor_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `essential_cookie_consent` tinyint(1) NOT NULL DEFAULT 0,
  `essential_cookie_consent_at` timestamp NULL DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'System Admin','marketlink118@gmail.com','0300-1112233','MarketLink Head Office, Lahore','admin',1,'PK','en',0,0,NULL,NULL,NULL,'$2y$10$oSf02327AHsnmmypPXVExOhkLBHz/Fqb3rlpHEz08/2dg5TVje0om',NULL,'2026-09-24 10:00:28','2026-09-24 10:00:28'),(2,'Tariq Mehmood','tariq@punjabfarm.com','0301-5556677','Kasur Agricultural Belt','farmer',1,'PK','en',0,0,NULL,NULL,NULL,'$2y$12$30Nw0ZLRBKBAbZAfp98VJOJ6/VAK/wFfPw.E5VE5avbv2BehBdoSa',NULL,'2026-09-24 10:00:28','2026-09-24 10:00:28'),(3,'Chaudhry Bashir','bashir@dairyfarm.com','0322-8889900','Sheikhupura Canal Road','farmer',1,'PK','en',0,0,NULL,NULL,NULL,'$2y$12$1HVW4EXK5kRe/vehi3hGLuCM//Ir1YKHzYfHRPVx6F9NgWwNuLewW',NULL,'2026-09-24 10:00:28','2026-09-24 10:00:28'),(4,'Haji Rasheed','rasheed@citrusfarm.com','0333-4443322','Sargodha Orchard Valley','farmer',1,'PK','en',0,0,NULL,NULL,NULL,'$2y$12$t4NbMZTbyRRY2uKou9CTq.Kbmnu6DZD27yEd/Di0PmF.Vmiskcs12',NULL,'2026-09-24 10:00:29','2026-09-24 10:00:29'),(5,'Aslam Khan','aslam@pendingfarm.com','0345-9988776','Pattoki Floriculture','farmer',1,'PK','en',0,0,NULL,NULL,NULL,'$2y$12$.JgrCKxlNqhe9ym5veDv7uwZVRV3TtOP/oRqn1kZ29HgM7AOkU3Bm',NULL,'2026-09-24 10:00:29','2026-09-24 10:00:29'),(6,'Hamza Ali','hamza@customer.com','0321-4567890','House 42, Block L, Gulberg III, Lahore','customer',1,'PK','en',0,0,NULL,NULL,NULL,'$2y$12$7yHA4FtKrb8ybaW8WZ5/Wexs4XYSoB0j2geiTy/Z/0l1lvbA/Ncfa',NULL,'2026-09-24 10:00:30','2026-09-24 10:00:30'),(7,'Zainab Bibi','zainab@customer.com','0333-7890123','House 18, Block B, Model Town, Lahore','customer',1,'PK','en',0,0,NULL,NULL,NULL,'$2y$12$bxpdNNKjkWHymfDYalRAt.wUKO/vfqg5UeF0fV1vO4mKwbAVJicdG',NULL,'2026-09-24 10:00:30','2026-09-24 10:00:30');
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

-- Dump completed on 2026-09-25 21:12:31
