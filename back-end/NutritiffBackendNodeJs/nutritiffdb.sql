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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin$01#nutritiff');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approval_requests`
--

LOCK TABLES `approval_requests` WRITE;
/*!40000 ALTER TABLE `approval_requests` DISABLE KEYS */;
INSERT INTO `approval_requests` VALUES (1,11,'pending');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,1,1,2),(2,2,2,3);
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
  `active_status` varchar(10) NOT NULL DEFAULT 'active',
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Viraj Malap','B-402, Greenolive Appt., Near Persistant Systems, Hinjawadi Phase 1, Pune, Maharashtra','B-402, Greenolive Appt., Near Persistant Systems, Hinjawadi Phase 1, Pune, Maharashtra','411057','virajmalap1999@gmail.com','pass ','9421447602','active'),(2,'Nilesh Sabale','A-303, Akshay Chandan Appt., Beltikanagar, Kanhaiya park, Thergaon, Pune, Maharashtra','A-303, Akshay Chandan Appt., Beltikanagar, Kanhaiya park, Thergaon, Pune, Maharashtra','411033','nileshsabale54@gmail.com','Lykan@2013','8854565458','active'),(3,'Neha Mahajan','B3-101, F Residency, Balewadi, Pune, Maharashtra','B3-101, F Residency, Balewadi, Pune, Maharashtra','411045','nehamahajan13@gmail.com','MustangGT@1964','9878236655','active'),(4,'Unknown','abc','abc','435343','unknown2@gmail.com','Asia','9876545678','inactive'),(5,'Unknown','abc','abc','435342','unknown@gmail.com','korea','9876545678','active'),(6,'Anyone','abc','abc','435342','anyone@gmail.com','bank','9876545678','active'),(7,'Tejas Bandbe','1C, Radheya HGS, Ratnagiri','1C, Radheya HGS, Ratnagiri','415639','tejasbandbe65@gmail.com','Tejas@123','undefined','active'),(8,'Nayana','abc','abc','435342','nayana@gmail.com','nayana@123','9876555678','active');
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
  `email` varchar(45) NOT NULL,
  `mob_no` varchar(13) NOT NULL,
  `address` varchar(100) NOT NULL,
  `licence_no` varchar(20) NOT NULL DEFAULT 'licencenumber',
  PRIMARY KEY (`pid`),
  UNIQUE KEY `email_UNIQUE` (`email`)
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
-- Table structure for table `feedback_complaints`
--

DROP TABLE IF EXISTS `feedback_complaints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback_complaints` (
  `fc_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `tiffin_id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `category` varchar(10) NOT NULL DEFAULT 'feedback',
  `description` varchar(100) NOT NULL DEFAULT 'feedback',
  `status` varchar(15) NOT NULL DEFAULT 'under review',
  PRIMARY KEY (`fc_id`),
  KEY `fk_fc_customerid_idx` (`customer_id`),
  KEY `fk_fc_tiffinid_idx` (`tiffin_id`),
  KEY `fk_fc_vendor_id_idx` (`vendor_id`),
  CONSTRAINT `fk_fc_customerid` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_fc_tiffinid` FOREIGN KEY (`tiffin_id`) REFERENCES `tiffins` (`tiffin_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_fc_vendorid` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback_complaints`
--

LOCK TABLES `feedback_complaints` WRITE;
/*!40000 ALTER TABLE `feedback_complaints` DISABLE KEYS */;
INSERT INTO `feedback_complaints` VALUES (1,1,1,1,'complaint','complaint','under review'),(2,1,1,1,'complaint2','complaint2','resolved'),(3,1,1,1,'complaint3','complaint3','escalated'),(4,1,1,1,'a','a','resolved'),(5,1,1,1,'b','b','escalated');
/*!40000 ALTER TABLE `feedback_complaints` ENABLE KEYS */;
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
  `tiffin_id` int NOT NULL,
  `total_price` double NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `transaction_id` varchar(100) NOT NULL DEFAULT 'tobefilled',
  `status` varchar(10) NOT NULL DEFAULT 'ordered',
  PRIMARY KEY (`order_id`),
  KEY `fk_orders_customerid_idx` (`customer_id`),
  KEY `fk_orders_tiffinid_idx` (`tiffin_id`),
  CONSTRAINT `fk_orders_customerid` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_orders_tiffinid` FOREIGN KEY (`tiffin_id`) REFERENCES `tiffins` (`tiffin_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,1,70,'2023-08-16 10:14:55','tobefilled','ordered'),(2,2,2,70,'2023-08-16 13:46:26','tobefilled','canceled');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `start_date` date NOT NULL,
  `status` varchar(10) NOT NULL,
  `transaction_id` varchar(50) NOT NULL,
  `timestamp` datetime NOT NULL,
  PRIMARY KEY (`purchase_id`),
  KEY `fk_customerid_customers_idx` (`customer_id`),
  KEY `fk_subpur_planid_idx` (`plan_id`),
  CONSTRAINT `fk_subpur_planid` FOREIGN KEY (`plan_id`) REFERENCES `subscription_plans` (`plan_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription_purchases`
--

LOCK TABLES `subscription_purchases` WRITE;
/*!40000 ALTER TABLE `subscription_purchases` DISABLE KEYS */;
INSERT INTO `subscription_purchases` VALUES (1,2,1,'2023-06-11','active','tobefilled','2023-06-11 14:03:43'),(2,2,2,'2023-06-11','active','tobefilled','2023-06-11 14:03:43'),(3,1,3,'2023-06-11','active','tobefilled','2023-06-11 14:03:43');
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
  `status` varchar(10) NOT NULL DEFAULT 'active',
  PRIMARY KEY (`tiffin_id`),
  UNIQUE KEY `tiffin_id_UNIQUE` (`tiffin_id`),
  KEY `fk_tiffins_vendorid_idx` (`vendor_id`),
  CONSTRAINT `fk_tiffins_vendorid` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiffins`
--

LOCK TABLES `tiffins` WRITE;
/*!40000 ALTER TABLE `tiffins` DISABLE KEYS */;
INSERT INTO `tiffins` VALUES (1,'Panner meal','Paneer veg curry, roti (2), dal, jeera rice, papad, pickle','veg',60,1,'active'),(2,'Egg thali','Egg omlette (1), roti (1), egg curry, jeera rice, solkadi','nonveg',70,2,'active'),(3,'Egg thali','Egg omlette (1), roti (1), egg curry, jeera rice, solkadi','nonveg',75,3,'active'),(4,'Panner meal','Paneer veg curry, roti (2), dal, jeera rice, papad, pickle','veg',65,1,'active'),(5,'Egg thali','Egg omlette (1), roti (1), egg curry, jeera rice, solkadi','nonveg',70,1,'inactive'),(6,'Egg thali','Egg omlette (1), roti (1), egg curry, jeera rice, solkadi','nonveg',70,1,'inactive'),(7,'Egg thali','Egg omlette (1), roti (1), egg curry, jeera rice, solkadi','nonveg',70,1,'inactive'),(8,'Poli Bhaji','poli bhaji','veg',42,1,'inactive');
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendors`
--

LOCK TABLES `vendors` WRITE;
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
INSERT INTO `vendors` VALUES (1,'Fab Foods','D1/302, Datta Mandir Rd, Wakad, Pune, Maharashtra','411057','fabfoodspune@gmail.com','Kitchen#67','8999193490','approved','active'),(2,'Garva Biryani','Datta Mandir Rd, Shankar Kalat Nagar, Wakad, Pune, Maharahstra','411057','garvabiryaniwakad@gmail.com','FreshBiryani@2009','9823629901','approved','active'),(3,'Satvik Misal House','Chikhali-Kaspate vasti BRTS Rd, Kaspate vasti, Pimpri-Chinchwad, Pune, Maharashtra','411057','misalhouse@gmail.com','FreshMisal@2014','8459281584','approved','active'),(4,'Idlicious','Foundree Preschool Rd, Baner, Pune, Maharashtra','411045','idliciousbaner@gmail.com','DosaSambar@123','9420147868','approved','active'),(5,'The Flour Works','Deron Hills, Sr. No. 6/11, Baner Rd, Baner, Pune, Maharashtra','411045','flourworks24_7@gmail.com','BestRestaurant#80','9860193619','approved','active'),(6,'Spice Garden','Rambaug colony, Tulja Bhavani Temple Rd, near MIT college, Kothrud, Pune, Maharashtra','411038','spicegarden@gmail.com','Dinning@Kothrud','8668603578','approved','active'),(7,'Pure veg tiffins','Shitala temple Rd, Shitala devi nagar, Sus, Pune, Maharashtra','411021','vegtiffins@gmail.com','ShitalaTiffins@2007','9321411747','approved','active'),(8,'Hotel Chawadi','Sus Ln, Mohan nagar Co-Op society, Baner, Pune, Maharashtra','411021','chawadihotel@gmail.com','HotelChawadi#2004','9825554909','pending','active'),(9,'Pind Punjab','Hinjawadi-Kasarai Rd, Phase 1, Hinjawadi Rajiv Gandhi Infotech park, Hinjawadi, Pune, Maharashtra','411057','pindpunjab@gmail.com','Sweet&Sour88','9645654212','approved','active'),(10,'Alleppees Kerala','Near Om sai tea stall, Phase 2, Hinjawadi Rajiv Gandhi Infotech park, Hinjawadi, Pune, Maharashtra','411057','keralaalleppees@gmail.com','FoodStall@2018','7456778323','approved','active'),(11,'Unknown','abc','654556','unknown@gmail.com','ugc','9876545678','pending','inactive'),(12,'Sample','Sample Address','535643','sample@gmail.com','Sample@123','undefined','pending','active'),(15,'Unknown2','abcd','635634','unonown2@gmail.com','pass','8736463648','pending','active');
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

-- Dump completed on 2023-08-16 20:29:32
