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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin$01#nutritiff'),(2,'admin$02#nutritiff'),(3,'admin$03#nutritiff');
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approval_requests`
--

LOCK TABLES `approval_requests` WRITE;
/*!40000 ALTER TABLE `approval_requests` DISABLE KEYS */;
INSERT INTO `approval_requests` VALUES (1,1,'approved'),(2,2,'approved'),(3,3,'approved'),(4,4,'approved'),(5,5,'approved'),(6,6,'approved'),(7,7,'rejected'),(8,8,'pending'),(9,9,'pending'),(10,10,'pending');
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
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (2,2,2,3),(42,14,11,1),(52,8,1,1),(53,8,3,1),(54,3,3,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Viraj Malap','B-402, Greenolive Appt., Near Persistant Systems, Hinjawadi Phase 1, Pune, Maharashtra','B-402, Greenolive Appt., Near Persistant Systems, Hinjawadi Phase 1, Pune, Maharashtra','411057','virajmalap1999@gmail.com','pass ','9421447602','active','active'),(2,'Nilesh Sabale','A-303, Akshay Chandan Appt., Beltikanagar, Kanhaiya park, Thergaon, Pune, Maharashtra','A-303, Akshay Chandan Appt., Beltikanagar, Kanhaiya park, Thergaon, Pune, Maharashtra','411033','nileshsabale54@gmail.com','Lykan@2013','8854565458','active','active'),(3,'Neha Mahajan','HN7/140 Vihar, near nana nani park, Chinchwad, Pune','HN7/140 Vihar, near nana nani park, Chinchwad, Pune','454545','neha@gmail.com','Neha@123','7665767566','active','active'),(4,'Ganesh Mestri','SN3/45 Visava, Kakade Park, Hinjawadi, Pune','SN3/45 Visava, Kakade Park, Hinjawadi, Pune','411655','ganeshmestri@gmail.com','Ganesh@1223','9822324522','active','active'),(5,'Saloni Sansare','Shri Laxmi PG, near Persistent, Hinjawadi, Pune','Shri Laxmi PG, near Persistent, Hinjawadi, Pune','411057','salonis@gmail.com','Saloni@123','8898786577','active','active'),(6,'Smruti Jadhav','D1, SLR PG, near Persistent, Hinjawadi, Pune','D1, SLR PG, near Persistent, Hinjawadi, Pune','411057','smrutimjadhav@gmail.com','Smruti@123','9011431152','inactive','active'),(7,'Pradnyesh Dongare','D-303, Royal city park, Wakad, Pune','D-303, Royal city park, Wakad, Pune','412654','prady@gmail.com','Prady@123','9096755653','active','active'),(8,'Nayana Jadhav','Sai Darshan Appt, Chinchwad, Pune','Sai Darshan Appt, Chinchwad, Pune','432234','nayana@gmail.com','nayana@123','9888667771','active','active'),(9,'Meghan Vichare','A-702, Siddhivinayak Appt, Akurdi, Pune','A-702, Siddhivinayak Appt, Akurdi, Pune','413726','meghanvichare32@gmail.com','Meghan@123','9834555654','inactive','active'),(10,' Gaurav shetye',' A-101, sairatna Appt, Pimple saudaghar, Pune',' A-101, sairatna Appt, Pimple saudaghar, Pune','411028','gauravshetye4545@gmail.com','Gaurav@123','9438565512','active','active'),(11,'Tejas gurav','C/205 TCG Building, Hnjewadi Phese 2,pune','C/205 TCG Building, Hnjewadi Phese 2,pune ','411057','tejasgurav55@gmail.com','Tejas@123','8866155316','active','active'),(12,'Shubham Padalkar','Sairaj Appt., Near Govind Garden, Pimple Sudaghar,pune, Maharashtra 411028','Sairaj Appt., Near Govind Garden, Pimple Sudaghar,pune, Maharashtra 411028','454545','shubhampadalkar12@gmail.com','Shubham@123','9421232465','inactive','active'),(13,'Vinayak Shetye','A-201 Aristo, Near Persistant, Hinjawadi Phase 1, Pune','A-201 Aristo, Near Persistant, Hinjawadi Phase 1, Pune','411057','vinayakshetye67@gmail.com','Vinayak@123','8865431278','inactive','active'),(14,'Swaroop Shetye','B-401 siddhivinayak socity, wakad, pune','B-401 siddhivinayak socity, wakad, pune','411056','swaroopshetye88@gmail.com','Swaroop@123','7776810423','active','active'),(15,'Mayur Varishe','HN4/320 Narayan Nagar, Wakad, Pune','HN4/320 Narayan Nagar, Wakad, Pune','411056','mayur@gmail.com','mayur@123','8776427476','active','active');
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_person`
--

LOCK TABLES `delivery_person` WRITE;
/*!40000 ALTER TABLE `delivery_person` DISABLE KEYS */;
INSERT INTO `delivery_person` VALUES (1,'Mahesh Nirmale','9827374645','maheshnirmale@gmail.com','Mahesh@123','SN3/45 Visava, Kakade Park, Hinjawadi, Pune','411655','MH14 1434544543'),(2,'Harish Nemade','9845455654','harishnemade@gmail.com','Harish@123','Shri Laxmi PG, near Persistent, Hinjawadi, Pune','411057','MH14 1545354535'),(3,'Manthan Vichare','7666455453','manthanv@gmail.com','Manthan@123','D1, SLR PG, near Persistent, Hinjawadi, Pune','411057','MH14 1542000342'),(4,'Kunal Jadhav','7764545453','kunalj@gmail.com','Kunal@123','D-303, Royal city park, Wakad, Pune','412654','MH14 1000433532'),(5,'Ashish Utekar','9823433343','ashish@gmail.com','Kunal@123','A-702, Siddhivinayak Appt, Akurdi, Pune','413726','MH14 1003245456'),(6,'Vikas Gavde ','9422382279','vikasgavde99@gmail.com','vikas@123','Plot No.4, kate vasti, Pimple saudaghar, Pune','411028','MH14 6545445678'),(7,'Suresh Kumar','7776815512','sureshkumar12@gmail.com','suresh@123','Plot No.4, Datta Nagar, Wakad, Pune','411028',' MH14 6545445614'),(8,'Ganesh kamble','8823459860','ganeshbhosle56@gmail.com','ganesh@123','Plot No.4,Power house, Hinjewadi phase 2, Pune','411013','MH14 6545441289'),(9,'Sushil Jadhav','8960555032','sushiljadhav90@gmail.com','sushil@123','Mukai Nagar, laxmi chawk, pune','411013','MH12 6545441255'),(10,'Nikhil Sakhre ','8799662543','nikhilsakhare440@gmail.com','nikhil@123','Mankar chawk, pune','411013','MH12 6544316855'),(11,'Rushi Gavas','9466798421','rushigavas29@gmail.com','rushi@123','Indira nagar, chinchwad, pune ','411012','MH12 6544314876');
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
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (1,1,3),(2,1,1),(3,1,4),(4,1,7),(5,1,5),(6,2,1),(7,2,3),(8,2,4),(9,3,2),(10,3,1),(11,4,4),(13,4,5),(18,4,1),(19,4,3),(20,5,1),(21,5,2),(22,5,3),(23,5,4),(24,6,5),(25,6,4),(26,7,3),(27,7,1),(28,7,2),(29,8,6),(30,8,4),(31,8,7),(32,8,1),(33,9,2),(34,9,4),(35,9,5),(36,10,1),(37,10,2),(38,10,3),(39,11,1),(40,11,2),(41,11,3),(42,11,6),(43,12,3),(44,13,2),(45,15,4),(46,15,7),(47,15,1),(48,15,3),(49,15,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback_complaints`
--

LOCK TABLES `feedback_complaints` WRITE;
/*!40000 ALTER TABLE `feedback_complaints` DISABLE KEYS */;
INSERT INTO `feedback_complaints` VALUES (1,5,2,'complaint','Food quantity is less','2023-08-20 08:52:26','resolved'),(2,4,3,'complaint','Food container was broken','2023-08-20 08:52:26','resolved'),(3,3,1,'complaint','Late delivery','2023-08-20 08:52:26','resolved'),(4,2,5,'feedback','Food quality is good','2023-08-20 08:52:26',''),(5,2,7,'feedback','On time delivery','2023-08-20 08:52:26',''),(6,5,7,'feedback','Food is delicious','2023-08-20 08:52:26',''),(7,4,12,'feedback','Food quality is good','2023-08-20 08:52:26',''),(8,6,1,'complaint','Delivery boy behaviour is not good','0001-01-01 00:00:00','resolved'),(9,3,4,'feedback','On time delivery','2023-08-22 14:56:28',NULL),(10,8,15,'complaint','Late delivery','2023-08-23 10:23:07','under review'),(11,4,3,'complaint','Food is so oily','2023-08-28 19:16:20','under review'),(12,7,1,'feedback','Food quality is good','2023-08-28 19:16:20',NULL),(13,5,4,'feedback','Food is delicious','2023-08-28 19:16:20',NULL),(14,3,13,'complaint','Food is not fresh','2023-08-28 19:16:20','resolved'),(15,10,1,'feedback','Food quality is good','2023-08-28 19:17:07',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,13,1,1,60),(2,13,2,1,70),(3,13,7,2,140),(4,2,2,3,210),(5,5,2,2,60),(6,6,2,2,140),(8,5,2,2,60),(9,5,1,1,60),(10,6,2,2,140),(11,6,1,1,140),(18,5,1,1,60),(19,5,2,2,60),(20,6,1,1,140),(21,6,2,2,140),(22,19,1,1,200),(23,19,2,2,200),(24,5,1,1,60),(25,5,2,2,60),(26,6,1,1,140),(27,6,2,2,140),(28,19,1,1,200),(29,19,2,2,200),(30,20,1,1,200),(31,20,2,2,200),(32,21,2,1,342),(33,21,1,2,342),(34,21,1,1,342),(35,21,3,1,342),(36,21,5,1,342),(37,21,3,1,342),(38,22,5,1,145),(39,22,3,1,145),(40,21,1,1,342),(41,23,1,1,60),(42,24,4,1,125),(43,24,1,1,125),(44,24,3,1,125),(45,25,3,1,75),(49,21,4,1,342),(51,27,4,1,107),(53,25,7,1,75),(54,29,7,1,70),(55,25,4,1,75),(56,29,4,1,70),(57,30,4,1,0),(58,25,3,1,75),(59,25,10,1,75),(60,29,3,1,70),(61,29,10,1,70),(62,30,3,1,220),(63,30,10,1,220),(64,31,3,1,125),(65,31,10,1,125),(69,25,5,1,75),(70,29,5,1,70),(71,30,5,1,0),(72,34,5,1,70),(73,35,2,1,70),(74,35,9,1,70),(75,36,9,1,80),(78,38,5,1,71),(79,39,4,1,70);
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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,70,'2023-08-16 10:14:55','H5rTy67Hdvhhiej','delivered'),(2,2,210,'2023-08-16 13:46:26','5bGmY7sKwH6dL1p','delivered'),(3,1,70,'2023-08-19 22:49:49','2nWxT4kUeR8vC3q','delivered'),(4,1,70,'2023-08-19 22:49:49','9jHtF6rVzX0mB5g','canceled'),(5,5,60,'2023-08-20 08:38:32','4dSgA1fQcE2vR9z','delivered'),(6,5,140,'2023-08-20 12:50:40','7pLmK3wNvZ6bG8x','delivered'),(7,4,70,'2023-08-21 14:34:59','6qYsT2jHbM5dF1k','delivered'),(8,3,60,'2023-08-22 14:50:53','3vCzX0mR9jPqA4s','canceled'),(9,3,60,'2023-08-22 17:31:46','1eGxW8cFtVzB7rN','delivered'),(10,3,60,'2023-08-22 17:33:14','0kUyD2nSvC5bH6j','delivered'),(11,1,60,'2023-08-22 17:43:57','9wLpK4gTfQ7zX3c','delivered'),(12,4,60,'2023-08-22 19:26:07','8qZxM1nWvC3rF5j','delivered'),(13,4,270,'2023-08-22 19:28:55','7sB5gH2dN6jR9vT','delivered'),(14,1,190,'2023-08-23 09:30:29','6zX0mP4eG8cV1nB','delivered'),(15,3,425,'2023-08-23 10:45:08','5kU3bS9jHtF7wLp','delivered'),(19,5,200,'2023-08-23 11:21:12','l8GxbrSFtVzB7rN','delivered'),(20,5,200,'2023-08-23 11:35:28','reGxWdtGtVzB7rN','delivered'),(21,7,342,'2023-08-25 12:58:26','PbovmupH98XCz2c','delivered'),(22,7,145,'2023-08-25 14:53:36','tkQCPjKgcMaT0hB','canceled'),(23,7,60,'2023-08-25 16:40:42','6iN06SY76PM8YEi','canceled'),(24,8,125,'2023-08-25 16:43:47','bL49llg7cm96ujv','canceled'),(25,8,75,'2023-08-25 16:45:31','hiuwHRbiadRy2uU','delivered'),(26,8,42,'2023-08-25 16:46:25','BfBtyWO4AUjKyBw','canceled'),(27,7,107,'2023-08-25 17:11:33','ku62ggrvg2JTjIt','delivered'),(28,9,100,'2023-08-25 17:22:35','d4MdrFhfdIIekXc','delivered'),(29,8,70,'2023-08-25 17:23:36','KzjWtC8NAONVcdY','canceled'),(30,8,0,'2023-08-25 17:24:32','mPV7cnaJPKVGClj','canceled'),(31,8,125,'2023-08-25 18:08:28','3nYqaG6gnkzz7w2','canceled'),(34,8,70,'2023-08-26 13:01:36','4uiGFMB2IgvVFu7','canceled'),(35,13,70,'2023-08-27 12:06:49','VhOZJI9RdBLtBWM','ordered'),(36,13,80,'2023-08-27 12:07:42','WFdEnQenUGNF6bs','ordered'),(37,13,42,'2023-08-27 12:13:50','GvhqbHautEv8H2r','ordered'),(38,8,71,'2023-08-27 19:15:21','sKuxSqNswgTM64G','ordered'),(39,8,70,'2023-08-28 20:11:44','8fTcR3jPqA9vZ2x','ordered');
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription_plans`
--

LOCK TABLES `subscription_plans` WRITE;
/*!40000 ALTER TABLE `subscription_plans` DISABLE KEYS */;
INSERT INTO `subscription_plans` VALUES (1,'mini','available only for lunch',2000,30),(2,'standard','available for lunch and dinner',3800,60),(3,'executive','available for breakfast, lunch and dinner',6000,90);
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription_purchases`
--

LOCK TABLES `subscription_purchases` WRITE;
/*!40000 ALTER TABLE `subscription_purchases` DISABLE KEYS */;
INSERT INTO `subscription_purchases` VALUES (1,2,1,'active','5bGmY7sKwH6dL1p','2023-06-11 14:03:43'),(2,2,2,'active','2nWxT4kUeR8vC3q','2023-06-11 14:03:43'),(3,1,3,'active','4dSgA1fQcE2vR9z','2023-06-11 14:03:43'),(4,2,4,'inactive','3vCzX0mR9jPqA4s','2023-08-20 10:38:41'),(5,3,5,'inactive','1eGxW8cFtVzB7rN','2023-08-22 15:00:43'),(6,1,7,'active','9wLpK4gTfQ7zX3c','2023-08-23 10:30:20'),(8,3,8,'active','tuSvvgvsjhjfLOs','2023-08-24 18:22:55'),(9,1,9,'active','ydGhTD75Mu7qIld','2023-08-25 18:47:48'),(10,1,10,'active','8fTcR3jPqA9vZ2x','2023-08-28 20:16:19'),(11,1,11,'active','9jHtF6rVzX0mB5g','2023-08-28 20:16:19'),(12,2,14,'active','7pLmK3wNvZ6bG8x','2023-08-28 20:16:19'),(13,1,15,'active','6qYsT2jHbM5dF1k','2023-08-28 20:16:19');
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiffins`
--

LOCK TABLES `tiffins` WRITE;
/*!40000 ALTER TABLE `tiffins` DISABLE KEYS */;
INSERT INTO `tiffins` VALUES (1,'Idli Sambar','Idlicious - Idli, Chutney and Sambar','veg',40,4,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQojPo99EoZA5esLY0rR81p7u_CY3XhJjpBHg&usqp=CAU','active'),(2,'Fab\'s Special','Fab Foods - Flower sabji, Rice and Dal','veg',50,1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZqzg2AknhfXF1EXFraaLLWv4GQk4FetSVwQ&usqp=CAU','active'),(3,'Chapati Bhaji','Satvik Khanaval - Flower+Matar, Chapati (3)','veg',50,3,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-B8AfgZd4LPDrutvo1YCwgEsWXTMAmcuuww&usqp=CAU','active'),(4,'Veg Thali','Idlicious - Chole, Rice, Chapati (2)','veg',70,4,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcZnnJ6QHSSkUAuklGr7DwoHnMRe_s0nXKfw&usqp=CAU','active'),(5,'Puri Bhaji','Fab Foods - Chana Masala, Puri(4)','veg',40,1,'https://t3.ftcdn.net/jpg/05/56/44/42/240_F_556444233_y3DWlXjQi8RvkyLlX5ye1PICXZbWXys6.jpg','active'),(6,'Chapati Bhaji','Spice Garden - Flower+Matar, Chapati (3)','veg',40,6,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjSmFSDoR6A79ClmkLM9ZKFasX_R5JTUyO027seuOxLMHeMSdRXgD1V6GW0ELgSipea18&usqp=CAU','active'),(7,'Chapati Bhaji','Fab Foods - Mix Veg Sabji, Chapati (3)','veg',50,1,'https://t3.ftcdn.net/jpg/03/48/89/30/240_F_348893040_ixBRsEK1SfW9Gj2TtCKwXT9JFi45trfR.jpg','active'),(9,'Anda Biryani','Garva Biryani - Anda Biryani','nonveg',80,2,'https://as2.ftcdn.net/v2/jpg/02/27/94/85/1000_F_227948508_zu4rTSk6o5JFvg5EL40u4Zs4n75o5Znu.jpg','active'),(10,'Panner meal','Fab Foods - Palak Paneer, Roti (2), Jira Rice, Dal Tadaka','veg',70,1,'https://media.istockphoto.com/id/1166167732/photo/palak-paneer-at-grey-concrete-background.jpg?s=612x612&w=0&k=20&c=MXjU-o2g600sjWVfuHnTKWbt1l9uf6Hb5YKjIGwzw-s=','active'),(11,'Idli','Idlicious - Idli (4), Sambar, Oranges','veg',50,4,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt9KZTc8wGd2MU6YeGX17Qt5RsuTxvnPMDyQ&usqp=CAU','active'),(12,'Veg Thali','Fab Foods - Aloo sabji, Chapati(2), Rice, Salad','veg',75,1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3nwCmPeChdgS75dPInwlmrZd6CuKmR8Iudw&usqp=CAU','active'),(13,'Chapati Bhaji','Shimala Mirch Sabji, Chapati (3)','veg',50,1,'https://t3.ftcdn.net/jpg/01/00/17/22/240_F_100172278_EXO0ko83PPeeA68PmBAC7dOGpKnPys12.jpg','active'),(15,'Veg Thali','Fab Foods - Flower Sabji, Chapati (2), Dal Tadaka, Rice','veg',70,1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-pNeVPvg26eymNS0XvjuIfzcXS1yU4ATelA&usqp=CAU','active'),(16,'Veg Thali','Pure veg tiffins - Flower Matar Sabji, Dal, Chapati (3), Rice','veg',80,7,'https://t3.ftcdn.net/jpg/04/95/58/06/240_F_495580695_NBXuOqjx7Oze6DkHy326nwj59pS2QiGP.jpg','active'),(17,'Paneer Meal','Pind Punjab - Paneer Masala, Roti (2), Jira Rice, Dal Tadaka','veg',70,9,'https://images.unsplash.com/photo-1631452180539-96aca7d48617?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFuZWVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60','active'),(18,'Dal Khichadi','Pind Punjab - Dal Khichadi','veg',50,9,'https://t4.ftcdn.net/jpg/02/69/13/65/240_F_269136591_Fz3SFsxjyImJE35R3vdfSKaJVcDIJvlO.jpg','active'),(19,'Puri Bhaji','Pure veg tiffins - Jeera Aloo Sabji, Puri (5)','veg',60,7,'https://t4.ftcdn.net/jpg/05/40/38/61/240_F_540386123_wVZWCXbu466hEAC8OgqylamWPTmFf65m.jpg','active'),(20,'Veg Thali','The Flour Works - Aloo Gobi, Matar Paneer, Roti (2) , Rice','veg',80,5,'https://t4.ftcdn.net/jpg/06/03/64/07/240_F_603640779_QNVbk3tSd5nEU1uAO7RifpHUjLZCsjDJ.jpg','active'),(21,'Puneri Special','Pure veg tiffins - Shev Bhaji, Chapati (3)','veg',40,7,'https://t3.ftcdn.net/jpg/03/78/12/62/240_F_378126234_ciMSVy1IU6Z83PCzwmuIes20gd1c9CEc.jpg','active'),(22,'Paneer Biryani','Garva Biryani - Paneer Biryani, Rayta','veg',70,2,'https://media.istockphoto.com/id/1408285755/photo/paneer-tikka-biryani-with-raita-served-in-a-dish-side-view-on-dark-background.webp?b=1&s=170667a&w=0&k=20&c=K7fsSbh5WgKr2JUiqcULSNmK3NVbHN-GycBWbcd3MMU=','active'),(23,'Kaju Special','Fab Foods - Kaju Masala, Chapati (3), Rice','veg',80,1,'https://t3.ftcdn.net/jpg/01/74/32/00/240_F_174320019_4OHlAxXdQljObdJWaKdpBC7uoqp4XdLR.jpg','active'),(24,'Chicken Thali','Spice Garden - Chicken Gravy, Chicken Curry,Chapati (2), Rice','nonveg',90,6,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS8vJDaLsiExJO-PevBZfMDx_Dkj8V4-oXCkRJS4bdSlxT5g9TrItx7TyefCeEft2S7Jg&usqp=CAU','active'),(25,'Veg Thali','Satvik Khanava - Akkha Masur, Chapati (2), Masale Bhat, Dahi','veg',70,3,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeoyJS4kq0cftN9yOdYCMiUM3GDi1DoqVnsQ&usqp=CAU','active'),(26,'Veg Thali','The Flour Works - Bharli Bhendi, Sabudana Vada, Dal, Rice','veg',60,2,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-orHXZkA76pVowxjO0lPjGpq4BRO3d3Wrvg&usqp=CAU','active'),(27,'Dal Rice','Hotel Chawadi - Dal, Rice','veg',50,8,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRMbgbziHRP162py04U61k7wr6DjmCSeKdPLKbo1p0I_VAoT2C7-IlOdXesK52jhdFDQ8&usqp=CAU','active'),(28,'Poli Bhaji','Hotel Chawadi- Rajama, Chapati(2), Gajar Halava','veg',60,8,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu9sB3-4eqvNp5Re201l4BCfsnaC1RA5QzEA&usqp=CAU','active');
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
  `active_status` varchar(20) NOT NULL DEFAULT 'active',
  PRIMARY KEY (`vendor_id`),
  UNIQUE KEY `address_UNIQUE` (`address`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `mob_no_UNIQUE` (`mob_no`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendors`
--

LOCK TABLES `vendors` WRITE;
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
INSERT INTO `vendors` VALUES (1,'Fab Foods','D1/302, Datta Mandir Rd, Wakad, Pune, Maharashtra','411056','fabfoodspune@gmail.com','Kitchen#68','8999193490','approved','active'),(2,'Garva Biryani','Datta Mandir Rd, Shankar Kalat Nagar, Wakad, Pune, Maharahstra','411057','garvabiryaniwakad@gmail.com','FreshBiryani@2009','9823629901','approved','active'),(3,'Satvik Khanaval','Chikhali-Kaspate vasti BRTS Rd, Kaspate vasti, Pimpri-Chinchwad, Pune, Maharashtra','411057','satvik@gmail.com','FreshMisal@2014','8459281584','approved','active'),(4,'Idlicious','Foundree Preschool Rd, Baner, Pune, Maharashtra','411045','idliciousbaner@gmail.com','DosaSambar@123','9420147868','approved','active'),(5,'The Flour Works','Deron Hills, Sr. No. 6/11, Baner Rd, Baner, Pune, Maharashtra','411045','flourworks24_7@gmail.com','BestRestaurant#80','9860193619','approved','active'),(6,'Spice Garden','Rambaug colony, Tulja Bhavani Temple Rd, near MIT college, Kothrud, Pune, Maharashtra','411038','spicegarden@gmail.com','Dinning@Kothrud','8668603578','approved','active'),(7,'Pure veg tiffins','Shitala temple Rd, Shitala devi nagar, Sus, Pune, Maharashtra','411021','vegtiffins@gmail.com','ShitalaTiffins@2007','9321411747','rejected','active'),(8,'Hotel Chawadi','Sus Ln, Mohan nagar Co-Op society, Baner, Pune, Maharashtra','411021','chawadihotel@gmail.com','HotelChawadi#2004','9825554909','pending','active'),(9,'Pind Punjab','Hinjawadi-Kasarai Rd, Phase 1, Hinjawadi Rajiv Gandhi Infotech park, Hinjawadi, Pune, Maharashtra','411057','pindpunjab@gmail.com','Sweet&Sour88','9645654212','pending','active'),(10,'Alleppees Kerala','Near Om sai tea stall, Phase 2, Hinjawadi Rajiv Gandhi Infotech park, Hinjawadi, Pune, Maharashtra','411057','keralaalleppees@gmail.com','FoodStall@2018','7456778323','pending','active');
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

-- Dump completed on 2023-08-28 22:49:34
