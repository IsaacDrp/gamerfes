/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.5.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: gamerfes
-- ------------------------------------------------------
-- Server version	11.5.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carrito` (
  `cart_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `subtotal` decimal(10,2) NOT NULL DEFAULT 0.00,
  `impuestos` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `payment_method_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `user_id` (`user_id`),
  KEY `payment_method_id` (`payment_method_id`),
  CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`user_id`),
  CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`payment_method_id`) REFERENCES `forma_pago` (`payment_method_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrito_videojuegos`
--

DROP TABLE IF EXISTS `carrito_videojuegos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carrito_videojuegos` (
  `cart_id` int(11) NOT NULL,
  `game_platform` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`cart_id`,`game_platform`),
  KEY `game_platform` (`game_platform`),
  CONSTRAINT `carrito_videojuegos_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carrito` (`cart_id`),
  CONSTRAINT `carrito_videojuegos_ibfk_2` FOREIGN KEY (`game_platform`) REFERENCES `videojuego_plataforma` (`game_platform`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito_videojuegos`
--

LOCK TABLES `carrito_videojuegos` WRITE;
/*!40000 ALTER TABLE `carrito_videojuegos` DISABLE KEYS */;
/*!40000 ALTER TABLE `carrito_videojuegos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forma_pago`
--

DROP TABLE IF EXISTS `forma_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `forma_pago` (
  `payment_method_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `type` enum('credit_card','debit_card','paypal','crypto') NOT NULL,
  `card_number` varchar(16) DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`payment_method_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `forma_pago_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forma_pago`
--

LOCK TABLES `forma_pago` WRITE;
/*!40000 ALTER TABLE `forma_pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `forma_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plataforma`
--

DROP TABLE IF EXISTS `plataforma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plataforma` (
  `platform_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`platform_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plataforma`
--

LOCK TABLES `plataforma` WRITE;
/*!40000 ALTER TABLE `plataforma` DISABLE KEYS */;
/*!40000 ALTER TABLE `plataforma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rol` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `apellido_paterno` varchar(50) NOT NULL,
  `apellido_materno` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `passwd` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `rol` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videojuego_plataforma`
--

DROP TABLE IF EXISTS `videojuego_plataforma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `videojuego_plataforma` (
  `game_platform` int(11) NOT NULL AUTO_INCREMENT,
  `game_id` int(11) DEFAULT NULL,
  `platform_id` int(11) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  PRIMARY KEY (`game_platform`),
  KEY `game_id` (`game_id`),
  KEY `platform_id` (`platform_id`),
  CONSTRAINT `videojuego_plataforma_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `videojuegos` (`game_id`),
  CONSTRAINT `videojuego_plataforma_ibfk_2` FOREIGN KEY (`platform_id`) REFERENCES `plataforma` (`platform_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videojuego_plataforma`
--

LOCK TABLES `videojuego_plataforma` WRITE;
/*!40000 ALTER TABLE `videojuego_plataforma` DISABLE KEYS */;
/*!40000 ALTER TABLE `videojuego_plataforma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videojuegos`
--

DROP TABLE IF EXISTS `videojuegos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `videojuegos` (
  `game_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `image_src` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`game_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videojuegos`
--

LOCK TABLES `videojuegos` WRITE;
/*!40000 ALTER TABLE `videojuegos` DISABLE KEYS */;
INSERT INTO `videojuegos` VALUES
(1,'The Legend of Zelda: Breath of the Wild','An open-world adventure game where you explore the land of Hyrule and defeat Calamity Ganon.','2017-03-03','/img/zelda_botw.jpg'),
(2,'The Witcher 3: Wild Hunt','An expansive RPG following Geralt of Rivia in a world full of monsters and intrigue.','2015-05-19','/img/witcher3.jpg'),
(3,'Red Dead Redemption 2','An action-adventure game set in the Wild West, following the story of Arthur Morgan.','2018-10-26','/img/rdr2.jpg'),
(4,'Super Mario Odyssey','A 3D platformer adventure where Mario travels across various worlds to rescue Princess Peach.','2017-10-27','/img/mario_odyssey.jpg'),
(5,'Cyberpunk 2077','A futuristic RPG set in the sprawling Night City, where you play as V in a world full of technology and danger.','2020-12-10','/img/cyberpunk2077.jpg'),
(6,'Animal Crossing: New Horizons','A life simulation game where you build and customize your island community.','2020-03-20','/img/animal_crossing.jpg'),
(7,'Dark Souls III','An action RPG known for its challenging gameplay and dark, immersive world.','2016-03-24','/img/dark_souls3.jpg'),
(8,'Hades','A rogue-like dungeon crawler where you fight to escape the Underworld as Zagreus, son of Hades.','2020-09-17','/img/hades.jpg'),
(9,'Fortnite','A battle royale game where players compete to be the last one standing on a large map.','2017-07-21','/img/fortnite.jpg'),
(10,'Minecraft','A sandbox game that lets you build and explore worlds made of blocks.','2011-11-18','/img/minecraft.jpg'),
(11,'Among Us','A multiplayer party game set in space, where you must identify the impostor among your crewmates.','2018-06-15','/img/among_us.jpg'),
(12,'Call of Duty: Modern Warfare','A first-person shooter game with a gripping single-player campaign and multiplayer modes.','2019-10-25','/img/cod_modern_warfare.jpg'),
(13,'Overwatch','A team-based multiplayer shooter with unique heroes and abilities.','2016-05-24','/img/overwatch.jpg'),
(14,'Halo Infinite','A first-person shooter featuring the return of Master Chief in a new epic adventure.','2021-12-08','/img/halo_infinite.jpg'),
(15,'Genshin Impact','An open-world action RPG with elemental magic and character-switching gameplay.','2020-09-28','/img/genshin_impact.jpg'),
(16,'Grand Theft Auto V','An open-world action-adventure game set in the city of Los Santos, with multiple storylines and online gameplay.','2013-09-17','/img/gta_v.jpg'),
(17,'Monster Hunter: World','An action RPG where you hunt monsters in a variety of ecosystems and craft equipment from their remains.','2018-01-26','/img/monster_hunter_world.jpg'),
(18,'Persona 5','A turn-based RPG that follows a group of high school students with the power to summon Personas.','2016-09-15','/img/persona5.jpg'),
(19,'Resident Evil Village','A survival horror game set in a mysterious village with terrifying enemies.','2021-05-07','/img/re_village.jpg'),
(20,'Sekiro: Shadows Die Twice','An action-adventure game set in Japan, where you play as a shinobi seeking revenge.','2019-03-22','/img/sekiro.jpg'),
(21,'God of War','An action-adventure game that follows Kratos and his son Atreus on a journey through Norse mythology.','2018-04-20','/img/god_of_war.jpg'),
(22,'Doom Eternal','A fast-paced first-person shooter where you battle demons from Hell across various worlds.','2020-03-20','/img/doom_eternal.jpg'),
(23,'Ghost of Tsushima','An open-world action-adventure game set in feudal Japan, where you play as a samurai fighting the Mongol invasion.','2020-07-17','/img/ghost_tsushima.jpg'),
(24,'Assassin’s Creed Valhalla','An action RPG where you play as a Viking warrior exploring England and building your settlement.','2020-11-10','/img/ac_valhalla.jpg'),
(25,'Hollow Knight','A 2D action-adventure game set in a beautifully dark, hand-drawn world full of challenging enemies.','2017-02-24','/img/hollow_knight.jpg'),
(26,'Death Stranding','An action-adventure game set in a post-apocalyptic world, where you deliver cargo across a fractured America.','2019-11-08','/img/death_stranding.jpg'),
(27,'Splatoon 2','A team-based third-person shooter where you battle using ink in a variety of colorful arenas.','2017-07-21','/img/splatoon2.jpg'),
(28,'Fall Guys','A massively multiplayer party game with up to 60 players in a variety of mini-games and obstacle courses.','2020-08-04','/img/fall_guys.jpg'),
(29,'The Last of Us Part II','An action-adventure game that continues the story of Ellie and Joel in a post-apocalyptic world.','2020-06-19','/img/last_of_us2.jpg'),
(30,'Final Fantasy VII Remake','A remake of the classic RPG, reimagining the story of Cloud Strife and his battle against Shinra.','2020-04-10','/img/ffvii_remake.jpg');
/*!40000 ALTER TABLE `videojuegos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2024-11-08 20:02:59
