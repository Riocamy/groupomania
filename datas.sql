-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id_com` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `message` varchar(500) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`id_com`),
  KEY `post_index` (`post_id`),
  KEY `user_id` (`user_id`) USING BTREE,
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (107,110,'Trop bien !','Sophie',182),(110,113,'G├®nial','Marc',182),(111,113,'Coucou !','Marc',181),(112,114,'Bravo Riogo :)','Emma',182),(113,114,'Bonjour Sophie !','Emma',181),(114,106,'Bien jou├® !','Riogo',184);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `user_id` int NOT NULL,
  `message` text NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `video` varchar(100) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `name_poster` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (110,'Hello la team ! Comment ├ºa va ?','http://localhost:8080/images/iStock-874722684.jpg1654034589694.jpg',NULL,181,'Sophie','2022-05-31 22:03:09'),(106,'├ºa code dur !','http://localhost:8080/images/logiciel-programmation-code-684x501.jpg1654035263104.jpg',NULL,182,'Riogo','2022-05-31 22:14:23'),(114,'Je vous annonce que nous avons d├®croch├® un contrat important !','http://localhost:8080/images/contrat-740x522.jpg1654036872500.jpg',NULL,184,'Emma','2022-05-31 22:41:12'),(110,'Afterwork vendredi soir pour f├¬ter le nouveau contrat ?','http://localhost:8080/images/6681-image.jpg1654037244057.jpg',NULL,185,'Sophie','2022-05-31 22:47:24');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postlike`
--

DROP TABLE IF EXISTS `postlike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postlike` (
  `idlike` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`idlike`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=241 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postlike`
--

LOCK TABLES `postlike` WRITE;
/*!40000 ALTER TABLE `postlike` DISABLE KEYS */;
INSERT INTO `postlike` VALUES (240,110,184),(239,106,184),(238,114,184),(237,114,181),(236,114,182),(234,113,182),(235,113,181),(228,112,181),(227,112,182),(226,110,182),(225,106,181),(222,110,178),(221,110,180);
/*!40000 ALTER TABLE `postlike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `email` varchar(50) NOT NULL,
  `pseudo` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `imageUrl` varchar(100) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `Emploi` varchar(100) DEFAULT NULL,
  `Ville` varchar(100) DEFAULT NULL,
  `Admin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `pseudo` (`pseudo`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('riogo@gmail.com','Riogo','$2b$10$VDXr5DTCpQoMK0UEyij43eK3.UoUD/Q/TVnmXGvs6psk5PjFobjjO','http://localhost:8080/images/teahub.io-all-wallpaper-21115.png1654007199593.png',106,'D├®veloppeur web','Paris',NULL),('sophie@groupomania.com','Sophie','$2b$10$sbiPeUC.13XtZMTczlyduO3Yw2.mtoKF/SnswYN4DBJ70oJdQqLbK','http://localhost:8080/images/14301-604732d5985dc.jpg1654029534996.jpg',110,'Charg├®e de communication','Paris',1),('marc@groupomania.com','Marc','$2b$10$4rGG8/VbMeYnSvW9g3guHu6Bg5vW50k.a9oD5BvrzxCEPSPuE0aeG','http://localhost:8080/images/9501e8784b8d4b3baa7ce0623dfa83.jpg1654036217786.jpg',113,'Commercial','Paris',NULL),('emma@groupomania.com','Emma','$2b$10$1SRlPp0.45x0zlo7tCQ6Ee99qYnjR15ZvN4QG71AomImXNZ.S0sp2','http://localhost:8080/images/7092178-original.webp1654036546270.undefined',114,'CEO','Paris',NULL);
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

-- Dump completed on 2022-06-01  0:52:43
