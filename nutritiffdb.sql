-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: nutritiffdb
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin$01#nutritiff'),(2,'admin$02#nutritiff');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `approval_requests`
--

DROP TABLE IF EXISTS `approval_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `approval_requests` (
  `req_id` int NOT NULL AUTO_INCREMENT,
  `vendor_id` int NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`req_id`),
  KEY `fk_apprreq_vendorid_idx` (`vendor_id`),
  CONSTRAINT `fk_apprreq_vendorid` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approval_requests`
--

LOCK TABLES `approval_requests` WRITE;
/*!40000 ALTER TABLE `approval_requests` DISABLE KEYS */;
INSERT INTO `approval_requests` VALUES (1,11,'pending'),(2,12,'pending'),(3,17,'rejected'),(4,20,'approved');
/*!40000 ALTER TABLE `approval_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `tiffin_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`cart_id`),
  KEY `fk_cart_tiffinid_idx` (`tiffin_id`),
  KEY `fk_cart_customerid_idx` (`customer_id`),
  CONSTRAINT `fk_cart_customerid` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cart_tiffinid` FOREIGN KEY (`tiffin_id`) REFERENCES `tiffins` (`tiffin_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (2,2,2,3);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `home_address` varchar(100) NOT NULL,
  `work_address` varchar(100) NOT NULL,
  `pincode` varchar(6) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(20) NOT NULL,
  `mob_no` varchar(13) NOT NULL,
  `sub_plan` varchar(10) DEFAULT 'inactive',
  `active_status` varchar(10) DEFAULT 'active',
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `mob_no_UNIQUE` (`mob_no`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Viraj Malap','B-402, Greenolive Appt., Near Persistant Systems, Hinjawadi Phase 1, Pune, Maharashtra','B-402, Greenolive Appt., Near Persistant Systems, Hinjawadi Phase 1, Pune, Maharashtra','411057','virajmalap1999@gmail.com','pass ','9421447602','active','active'),(2,'Nilesh Sabale','A-303, Akshay Chandan Appt., Beltikanagar, Kanhaiya park, Thergaon, Pune, Maharashtra','A-303, Akshay Chandan Appt., Beltikanagar, Kanhaiya park, Thergaon, Pune, Maharashtra','411033','nileshsabale54@gmail.com','Lykan@2013','8854565458','active','active'),(3,'Neha Mahajan','abcd','abcd','454545','neha@gmail.com','MustangGT@1964','7665767565','active','active'),(4,'Unknown','abc','abc','435343','unknown2@gmail.com','Asia','9876545678','inactive','inactive'),(5,'Unknown','abc','abc','435342','unknown@gmail.com','korea','9876545668','inactive','active'),(6,'Anyone','abc','abc','435342','anyone@gmail.com','bank','9876545578','inactive','active'),(7,'Tejas Bandbe','1C, Radheya HGS, Ratnagiri','1C, Radheya HGS, Ratnagiri','415639','tejasbandbe65@gmail.com','Tejas@123','9823629901','inactive','active'),(8,'Nayana','Mumbai','Mumbai','564856','nayana@gmail.com','nayana@123','9888667757','active','active'),(9,'Ratan','Ratan','Ratan','546464','ratan@gmail.com','Ratan@123','8574657473','inactive','active'),(12,'string','string123','string123','656565','string@gmail.com','string@123','8776655443','inactive','active'),(13,'Aniket','abcd','abcd','564656','aniket@gmail.com','Aniket@123','9876767676','inactive','active'),(14,'Smruti','Pune','Pune','454545','smriti@gmail.com','Smriti@123','9886677685','inactive','active');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery_person`
--

DROP TABLE IF EXISTS `delivery_person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_person` (
  `pid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `mob_no` varchar(13) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `address` varchar(100) NOT NULL,
  `pincode` varchar(6) NOT NULL,
  `licence_no` varchar(20) NOT NULL DEFAULT 'licencenumber',
  PRIMARY KEY (`pid`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `mob_no_UNIQUE` (`mob_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_person`
--

LOCK TABLES `delivery_person` WRITE;
/*!40000 ALTER TABLE `delivery_person` DISABLE KEYS */;
/*!40000 ALTER TABLE `delivery_person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `f_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `tiffin_id` int NOT NULL,
  PRIMARY KEY (`f_id`),
  KEY `fk_favorites_customerid_idx` (`customer_id`),
  KEY `fk_favorites_tiffinid_idx` (`tiffin_id`),
  CONSTRAINT `fk_favorites_customerid` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_favorites_tiffinid` FOREIGN KEY (`tiffin_id`) REFERENCES `tiffins` (`tiffin_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (1,5,3),(2,1,3),(3,2,2),(4,2,3),(5,2,5),(6,4,5),(7,3,3),(8,14,5);
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback_complaints`
--

DROP TABLE IF EXISTS `feedback_complaints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback_complaints` (
  `fc_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `tiffin_id` int NOT NULL,
  `category` varchar(10) NOT NULL DEFAULT 'feedback',
  `description` varchar(100) NOT NULL DEFAULT 'feedback',
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`fc_id`),
  KEY `fk_fc_customerid_idx` (`customer_id`),
  KEY `fk_fc_tiffinid_idx` (`tiffin_id`),
  CONSTRAINT `fk_fc_customerid` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_fc_tiffinid` FOREIGN KEY (`tiffin_id`) REFERENCES `tiffins` (`tiffin_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback_complaints`
--

LOCK TABLES `feedback_complaints` WRITE;
/*!40000 ALTER TABLE `feedback_complaints` DISABLE KEYS */;
INSERT INTO `feedback_complaints` VALUES (1,1,1,'complaint','complaint','2023-08-20 08:52:26','under review'),(2,1,1,'complaint','complaint2','2023-08-20 08:52:26','resolved'),(3,1,1,'complaint','complaint3','2023-08-20 08:52:26','escalated'),(4,1,1,'complaint','a','2023-08-20 08:52:26','escalated'),(5,1,1,'feedback','b','2023-08-20 08:52:26',''),(6,5,3,'feedback','tastes good','2023-08-20 08:52:26',''),(7,5,3,'feedback','tastes good','2023-08-20 08:52:26',''),(8,6,4,'complaint','packing not good','0001-01-01 00:00:00',NULL),(9,3,3,'feedback','feedback','2023-08-22 14:56:28',NULL),(10,14,5,'feedback','feedback','2023-08-23 10:23:07',NULL);
/*!40000 ALTER TABLE `feedback_complaints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `orderitem_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `tiffin_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `price` double NOT NULL,
  PRIMARY KEY (`orderitem_id`),
  KEY `fk_orderitem_orderid_idx` (`order_id`),
  KEY `fk_orderitem_tiffinid_idx` (`tiffin_id`),
  CONSTRAINT `fk_orderitem_orderid` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_orderitem_tiffinid` FOREIGN KEY (`tiffin_id`) REFERENCES `tiffins` (`tiffin_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,13,1,1,60),(2,13,2,1,70),(3,13,7,2,140),(4,2,2,3,210),(5,5,2,2,60),(6,6,2,2,140),(8,5,2,2,60),(9,5,1,1,60),(10,6,2,2,140),(11,6,1,1,140),(18,5,1,1,60),(19,5,2,2,60),(20,6,1,1,140),(21,6,2,2,140),(22,19,1,1,200),(23,19,2,2,200),(24,5,1,1,60),(25,5,2,2,60),(26,6,1,1,140),(27,6,2,2,140),(28,19,1,1,200),(29,19,2,2,200),(30,20,1,1,200),(31,20,2,2,200);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `total_price` double NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `transaction_id` varchar(20) NOT NULL DEFAULT 'tobefilled',
  `status` varchar(10) NOT NULL DEFAULT 'ordered',
  PRIMARY KEY (`order_id`),
  KEY `fk_orders_customerid_idx` (`customer_id`),
  CONSTRAINT `fk_orders_customerid` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,70,'2023-08-16 10:14:55','','delivered'),(2,2,210,'2023-08-16 13:46:26','','ordered'),(3,1,70,'2023-08-19 22:49:49','','delivered'),(4,1,70,'2023-08-19 22:49:49','','canceled'),(5,5,60,'2023-08-20 08:38:32','','delivered'),(6,5,140,'2023-08-20 12:50:40','','delivered'),(7,4,70,'2023-08-21 14:34:59','','delivered'),(8,3,60,'2023-08-22 14:50:53','','canceled'),(9,3,60,'2023-08-22 17:31:46','BbZdZ8','delivered'),(10,3,60,'2023-08-22 17:33:14','ya1t9996','ordered'),(11,1,60,'2023-08-22 17:43:57','tobefilled','ordered'),(12,4,60,'2023-08-22 19:26:07','System.Char[]','ordered'),(13,4,270,'2023-08-22 19:28:55','F1HKRjEh','ordered'),(14,1,190,'2023-08-23 09:30:29','YCFGK1Il','ordered'),(15,3,425,'2023-08-23 10:45:08','sQ6R0shp','delivered'),(19,5,200,'2023-08-23 11:21:12','Dko7lDkZ','delivered'),(20,5,200,'2023-08-23 11:35:28','W2SMafxf','ordered');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sample`
--

DROP TABLE IF EXISTS `sample`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sample` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` blob NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sample`
--

LOCK TABLES `sample` WRITE;
/*!40000 ALTER TABLE `sample` DISABLE KEYS */;
INSERT INTO `sample` VALUES (1,_binary 'undefined'),(2,_binary 'undefined'),(3,_binary 'undefined'),(4,_binary 'undefined'),(5,_binary 'undefined'),(6,_binary 'undefined'),(7,_binary 'undefined'),(8,_binary 'undefined'),(9,_binary 'undefined'),(10,_binary 'undefined');
/*!40000 ALTER TABLE `sample` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscription_plans`
--

DROP TABLE IF EXISTS `subscription_plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscription_plans` (
  `plan_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `description` varchar(100) NOT NULL,
  `price` float NOT NULL,
  `no_of_meals` int NOT NULL,
  PRIMARY KEY (`plan_id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription_plans`
--

LOCK TABLES `subscription_plans` WRITE;
/*!40000 ALTER TABLE `subscription_plans` DISABLE KEYS */;
INSERT INTO `subscription_plans` VALUES (1,'mini','tobefilled',2000,30),(2,'standard','tobefilled',3800,60),(3,'executive','tobefilled',6000,90);
/*!40000 ALTER TABLE `subscription_plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscription_purchases`
--

DROP TABLE IF EXISTS `subscription_purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscription_purchases` (
  `purchase_id` int NOT NULL AUTO_INCREMENT,
  `plan_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'active',
  `transaction_id` varchar(50) NOT NULL DEFAULT 'tobefilled',
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`purchase_id`),
  KEY `fk_customerid_customers_idx` (`customer_id`),
  KEY `fk_subpur_planid_idx` (`plan_id`),
  CONSTRAINT `fk_subpur_planid` FOREIGN KEY (`plan_id`) REFERENCES `subscription_plans` (`plan_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription_purchases`
--

LOCK TABLES `subscription_purchases` WRITE;
/*!40000 ALTER TABLE `subscription_purchases` DISABLE KEYS */;
INSERT INTO `subscription_purchases` VALUES (1,2,1,'active','tobefilled','2023-06-11 14:03:43'),(2,2,2,'active','tobefilled','2023-06-11 14:03:43'),(3,1,3,'active','tobefilled','2023-06-11 14:03:43'),(4,2,5,'inactive','tobefilled','2023-08-20 10:38:41'),(5,3,4,'inactive','tobefilled','2023-08-22 15:00:43'),(6,1,8,'active','tobefilled','2023-08-23 10:30:20');
/*!40000 ALTER TABLE `subscription_purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tiffins`
--

DROP TABLE IF EXISTS `tiffins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tiffins` (
  `tiffin_id` int NOT NULL AUTO_INCREMENT,
  `tiffin_name` varchar(20) NOT NULL,
  `description` varchar(100) NOT NULL,
  `tiffin_category` varchar(10) NOT NULL,
  `tiffin_price` float NOT NULL,
  `vendor_id` int NOT NULL,
  `image_link` varchar(500) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'active',
  PRIMARY KEY (`tiffin_id`),
  UNIQUE KEY `tiffin_id_UNIQUE` (`tiffin_id`),
  KEY `fk_tiffins_vendorid_idx` (`vendor_id`),
  CONSTRAINT `fk_tiffins_vendorid` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiffins`
--

LOCK TABLES `tiffins` WRITE;
/*!40000 ALTER TABLE `tiffins` DISABLE KEYS */;
INSERT INTO `tiffins` VALUES (1,'Panner meal','Paneer veg curry, roti (2), dal, jeera rice, papad, pickle','veg',60,1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQojPo99EoZA5esLY0rR81p7u_CY3XhJjpBHg&usqp=CAU','active'),(2,'Egg thali','Egg omlette (1), roti (1), egg curry, jeera rice, solkadi','nonveg',70,2,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZqzg2AknhfXF1EXFraaLLWv4GQk4FetSVwQ&usqp=CAU','active'),(3,'Egg thali','Egg omlette (1), roti (1), egg curry, jeera rice, solkadi','nonveg',75,3,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-B8AfgZd4LPDrutvo1YCwgEsWXTMAmcuuww&usqp=CAU','active'),(4,'Panner meal','Paneer veg curry, roti (2), dal, jeera rice, papad, pickle','veg',65,1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcZnnJ6QHSSkUAuklGr7DwoHnMRe_s0nXKfw&usqp=CAU','active'),(5,'Egg thali','Egg omlette (1), roti (1), egg curry, jeera rice, solkadi','nonveg',70,1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeoyJS4kq0cftN9yOdYCMiUM3GDi1DoqVnsQ&usqp=CAU','active'),(6,'Egg thali','Egg omlette (1), roti (1), egg curry, jeera rice, solkadi','nonveg',70,1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjSmFSDoR6A79ClmkLM9ZKFasX_R5JTUyO027seuOxLMHeMSdRXgD1V6GW0ELgSipea18&usqp=CAU','active'),(7,'Egg thali','Egg omlette (1), roti (1), egg curry, jeera rice, solkadi','nonveg',70,1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS8vJDaLsiExJO-PevBZfMDx_Dkj8V4-oXCkRJS4bdSlxT5g9TrItx7TyefCeEft2S7Jg&usqp=CAU','active'),(8,'Poli Bhaji','poli bhaji','veg',42,1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu9sB3-4eqvNp5Re201l4BCfsnaC1RA5QzEA&usqp=CAU','active'),(9,'Anda Biryani','Anda Biryani','nonveg',80,4,'https://i0.wp.com/cookingfromheart.com/wp-content/uploads/2015/06/Egg-Biriyani-1.jpg?resize=720%2C481&ssl=1','active'),(10,'\"Rice Tiff\"','\"Rice Tiffin\"','\"veg\"',50,1,'dc9d690e0072dbdd9cd764dccbfa6ac9','active'),(11,'\"Rice Tiff\"','\"Rice Tiffin\"','\"veg\"',50,1,'cea69999c9f148e3949ea5acc2c5f704','active'),(12,'Poli bhaji','description','veg',50,1,'...','active'),(13,'\"Rice Tiff\"','\"Rice Tiffin\"','\"veg\"',50,1,'31ae5cac47589316bb78676b61a909ad','active'),(14,'Veg Tiff','Veg tiffin tiffin','veg',55,6,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRMbgbziHRP162py04U61k7wr6DjmCSeKdPLKbo1p0I_VAoT2C7-IlOdXesK52jhdFDQ8&usqp=CAU','active');
/*!40000 ALTER TABLE `tiffins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendors`
--

DROP TABLE IF EXISTS `vendors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendors` (
  `vendor_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `address` varchar(100) NOT NULL,
  `pincode` varchar(6) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(20) NOT NULL,
  `mob_no` varchar(13) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'pending',
  `active_status` varchar(20) NOT NULL DEFAULT 'inactive',
  PRIMARY KEY (`vendor_id`),
  UNIQUE KEY `address_UNIQUE` (`address`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `mob_no_UNIQUE` (`mob_no`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendors`
--

LOCK TABLES `vendors` WRITE;
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
INSERT INTO `vendors` VALUES (1,'Fab Foods','D1/302, Datta Mandir Rd, Wakad, Pune, Maharashtra','411057','fabfoodspune@gmail.com','Kitchen#67','8999193490','approved','active'),(2,'Garva Biryani','Datta Mandir Rd, Shankar Kalat Nagar, Wakad, Pune, Maharahstra','411057','garvabiryaniwakad@gmail.com','FreshBiryani@2009','9823629901','approved','active'),(3,'Satvik Misal House','Chikhali-Kaspate vasti BRTS Rd, Kaspate vasti, Pimpri-Chinchwad, Pune, Maharashtra','411057','misalhouse@gmail.com','FreshMisal@2014','8459281584','approved','active'),(4,'Idlicious','Foundree Preschool Rd, Baner, Pune, Maharashtra','411045','idliciousbaner@gmail.com','DosaSambar@123','9420147868','approved','active'),(5,'The Flour Works','Deron Hills, Sr. No. 6/11, Baner Rd, Baner, Pune, Maharashtra','411045','flourworks24_7@gmail.com','BestRestaurant#80','9860193619','approved','active'),(6,'Spice Garden','Rambaug colony, Tulja Bhavani Temple Rd, near MIT college, Kothrud, Pune, Maharashtra','411038','spicegarden@gmail.com','Dinning@Kothrud','8668603578','approved','active'),(7,'Pure veg tiffins','Shitala temple Rd, Shitala devi nagar, Sus, Pune, Maharashtra','411021','vegtiffins@gmail.com','ShitalaTiffins@2007','9321411747','approved','active'),(8,'Hotel Chawadi','Sus Ln, Mohan nagar Co-Op society, Baner, Pune, Maharashtra','411021','chawadihotel@gmail.com','HotelChawadi#2004','9825554909','pending','active'),(9,'Pind Punjab','Hinjawadi-Kasarai Rd, Phase 1, Hinjawadi Rajiv Gandhi Infotech park, Hinjawadi, Pune, Maharashtra','411057','pindpunjab@gmail.com','Sweet&Sour88','9645654212','approved','active'),(10,'Alleppees Kerala','Near Om sai tea stall, Phase 2, Hinjawadi Rajiv Gandhi Infotech park, Hinjawadi, Pune, Maharashtra','411057','keralaalleppees@gmail.com','FoodStall@2018','7456778323','approved','active'),(11,'Unknown','abc','654556','unknown@gmail.com','ugc','9876545678','pending','inactive'),(12,'Vendor2','address','535643','sample@gmail.com','Sample@123','767567564','pending','active'),(15,'Unknown2','abcd','635634','unonown2@gmail.com','pass','8736463648','pending','active'),(16,'vendor','vendorabc','656464','vendor@gmail.com','Vendor#123','8576757455','pending','active'),(17,'string','string123','656565','string@gmail.com','string@123','978675665','pending','inactive'),(19,'Vendor2','abcde','abcd','vendor2@gmail.com','Vendor@123','6564657465','pending','inactive'),(20,'VendorB','string','string','string','VendorB','string','pending','inactive');
/*!40000 ALTER TABLE `vendors` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-23 14:29:30
