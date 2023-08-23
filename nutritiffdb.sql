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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,1,1,2),(2,2,2,3),(4,3,3,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Viraj Malap','B-402, Greenolive Appt., Near Persistant Systems, Hinjawadi Phase 1, Pune, Maharashtra','B-402, Greenolive Appt., Near Persistant Systems, Hinjawadi Phase 1, Pune, Maharashtra','411057','virajmalap1999@gmail.com','pass ','9421447602','active','active'),(2,'Nilesh Sabale','A-303, Akshay Chandan Appt., Beltikanagar, Kanhaiya park, Thergaon, Pune, Maharashtra','A-303, Akshay Chandan Appt., Beltikanagar, Kanhaiya park, Thergaon, Pune, Maharashtra','411033','nileshsabale54@gmail.com','Lykan@2013','8854565458','active','active'),(3,'Neha Mahajan','B3-101, F Residency, Balewadi, Pune, Maharashtra','B3-101, F Residency, Balewadi, Pune, Maharashtra','411045','nehamahajan13@gmail.com','MustangGT@1964','9878236655','active','active'),(4,'Unknown','abc','abc','435343','unknown2@gmail.com','Asia','9876545678','inactive','inactive'),(5,'Unknown','abc','abc','435342','unknown@gmail.com','korea','9876545668','inactive','active'),(6,'Anyone','abc','abc','435342','anyone@gmail.com','bank','9876545578','inactive','active'),(7,'Tejas Bandbe','1C, Radheya HGS, Ratnagiri','1C, Radheya HGS, Ratnagiri','415639','tejasbandbe65@gmail.com','Tejas@123','9823629901','inactive','active'),(8,'Nayana','abc','abc','435342','nayana@gmail.com','nayana@123','9872555678','inactive','active'),(9,'Ratan','Ratan','Ratan','546464','ratan@gmail.com','Ratan@123','8574657473','inactive','active'),(12,'string','string123','string123','656565','string@gmail.com','string#123','8776655443','inactive','active');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (1,5,3),(2,1,3),(3,2,2),(4,2,3),(5,2,5),(6,4,5);
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback_complaints`
--

LOCK TABLES `feedback_complaints` WRITE;
/*!40000 ALTER TABLE `feedback_complaints` DISABLE KEYS */;
INSERT INTO `feedback_complaints` VALUES (1,1,1,'complaint','complaint','2023-08-20 08:52:26','under review'),(2,1,1,'complaint','complaint2','2023-08-20 08:52:26','resolved'),(3,1,1,'complaint','complaint3','2023-08-20 08:52:26','escalated'),(4,1,1,'feedback','a','2023-08-20 08:52:26',''),(5,1,1,'feedback','b','2023-08-20 08:52:26',''),(6,5,3,'feedback','tastes good','2023-08-20 08:52:26',''),(7,5,3,'feedback','tastes good','2023-08-20 08:52:26',''),(8,6,4,'complaint','packing not good','0001-01-01 00:00:00',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,1,70,'2023-08-16 10:14:55','tobefilled','ordered'),(2,2,2,70,'2023-08-16 13:46:26','tobefilled','canceled'),(3,1,1,70,'2023-08-19 22:49:49','tobefilled','delivered'),(4,1,2,70,'2023-08-19 22:49:49','tobefilled','canceled'),(5,5,3,60,'2023-08-20 08:38:32','tobefilled','ordered');
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
  `status` varchar(10) NOT NULL DEFAULT 'active',
  `transaction_id` varchar(50) NOT NULL DEFAULT 'tobefilled',
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`purchase_id`),
  KEY `fk_customerid_customers_idx` (`customer_id`),
  KEY `fk_subpur_planid_idx` (`plan_id`),
  CONSTRAINT `fk_subpur_planid` FOREIGN KEY (`plan_id`) REFERENCES `subscription_plans` (`plan_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription_purchases`
--

LOCK TABLES `subscription_purchases` WRITE;
/*!40000 ALTER TABLE `subscription_purchases` DISABLE KEYS */;
INSERT INTO `subscription_purchases` VALUES (1,2,1,'active','tobefilled','2023-06-11 14:03:43'),(2,2,2,'active','tobefilled','2023-06-11 14:03:43'),(3,1,3,'active','tobefilled','2023-06-11 14:03:43'),(4,2,5,'inactive','tobefilled','2023-08-20 10:38:41');
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
  `image_link` longtext NOT NULL,
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
INSERT INTO `tiffins` VALUES (1,'Panner meal','Paneer veg curry, roti (2), dal, jeera rice, papad, pickle','veg',60,1,'data:image/jpeg;base64,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','active'),(2,'Egg thali','Egg omlette (1), roti (1), egg curry, jeera rice, solkadi','nonveg',70,2,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNZERAM1neEvREUw5Umv3BoN6ui62pipbbCg&usqp=CAU','active'),(3,'Egg thali','Egg omlette (1), roti (1), egg curry, jeera rice, solkadi','nonveg',75,3,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-B8AfgZd4LPDrutvo1YCwgEsWXTMAmcuuww&usqp=CAU','active'),(4,'Panner meal','Paneer veg curry, roti (2), dal, jeera rice, papad, pickle','veg',65,1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcZnnJ6QHSSkUAuklGr7DwoHnMRe_s0nXKfw&usqp=CAU','active'),(5,'Egg thali','Egg omlette (1), roti (1), egg curry, jeera rice, solkadi','nonveg',70,1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeoyJS4kq0cftN9yOdYCMiUM3GDi1DoqVnsQ&usqp=CAU','active'),(6,'Egg thali','Egg omlette (1), roti (1), egg curry, jeera rice, solkadi','nonveg',70,1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjSmFSDoR6A79ClmkLM9ZKFasX_R5JTUyO027seuOxLMHeMSdRXgD1V6GW0ELgSipea18&usqp=CAU','active'),(7,'Egg thali','Egg omlette (1), roti (1), egg curry, jeera rice, solkadi','nonveg',70,1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS8vJDaLsiExJO-PevBZfMDx_Dkj8V4-oXCkRJS4bdSlxT5g9TrItx7TyefCeEft2S7Jg&usqp=CAU','active'),(8,'Poli Bhaji','poli bhaji','veg',42,1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu9sB3-4eqvNp5Re201l4BCfsnaC1RA5QzEA&usqp=CAU','inactive');
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendors`
--

LOCK TABLES `vendors` WRITE;
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
INSERT INTO `vendors` VALUES (1,'Fab Foods','D1/302, Datta Mandir Rd, Wakad, Pune, Maharashtra','411057','fabfoodspune@gmail.com','Kitchen#67','8999193490','approved','active'),(2,'Garva Biryani','Datta Mandir Rd, Shankar Kalat Nagar, Wakad, Pune, Maharahstra','411057','garvabiryaniwakad@gmail.com','FreshBiryani@2009','9823629901','approved','active'),(3,'Satvik Misal House','Chikhali-Kaspate vasti BRTS Rd, Kaspate vasti, Pimpri-Chinchwad, Pune, Maharashtra','411057','misalhouse@gmail.com','FreshMisal@2014','8459281584','approved','active'),(4,'Idlicious','Foundree Preschool Rd, Baner, Pune, Maharashtra','411045','idliciousbaner@gmail.com','DosaSambar@123','9420147868','approved','active'),(5,'The Flour Works','Deron Hills, Sr. No. 6/11, Baner Rd, Baner, Pune, Maharashtra','411045','flourworks24_7@gmail.com','BestRestaurant#80','9860193619','approved','active'),(6,'Spice Garden','Rambaug colony, Tulja Bhavani Temple Rd, near MIT college, Kothrud, Pune, Maharashtra','411038','spicegarden@gmail.com','Dinning@Kothrud','8668603578','approved','active'),(7,'Pure veg tiffins','Shitala temple Rd, Shitala devi nagar, Sus, Pune, Maharashtra','411021','vegtiffins@gmail.com','ShitalaTiffins@2007','9321411747','approved','active'),(8,'Hotel Chawadi','Sus Ln, Mohan nagar Co-Op society, Baner, Pune, Maharashtra','411021','chawadihotel@gmail.com','HotelChawadi#2004','9825554909','pending','active'),(9,'Pind Punjab','Hinjawadi-Kasarai Rd, Phase 1, Hinjawadi Rajiv Gandhi Infotech park, Hinjawadi, Pune, Maharashtra','411057','pindpunjab@gmail.com','Sweet&Sour88','9645654212','approved','active'),(10,'Alleppees Kerala','Near Om sai tea stall, Phase 2, Hinjawadi Rajiv Gandhi Infotech park, Hinjawadi, Pune, Maharashtra','411057','keralaalleppees@gmail.com','FoodStall@2018','7456778323','approved','active'),(11,'Unknown','abc','654556','unknown@gmail.com','ugc','9876545678','pending','inactive'),(12,'Sample','Sample Address','535643','sample@gmail.com','Sample@123','undefined','pending','active'),(15,'Unknown2','abcd','635634','unonown2@gmail.com','pass','8736463648','pending','active'),(16,'Vendor','vendor','656464','vendor@gmail.com','Vendor@123','8576757455','pending','active');
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

-- Dump completed on 2023-08-20 11:00:45
