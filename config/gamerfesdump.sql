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
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`cart_id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
INSERT INTO `carrito` VALUES
(1,8,0.00,0.00,0.00,'2024-11-26 03:27:12','2024-11-26 03:27:12'),
(2,10,0.00,0.00,0.00,'2024-11-26 05:40:09','2024-11-26 05:40:09');
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
  `quantity` int(11) NOT NULL CHECK (`quantity` > 0),
  PRIMARY KEY (`cart_id`,`game_platform`),
  KEY `game_platform` (`game_platform`),
  CONSTRAINT `carrito_videojuegos_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carrito` (`cart_id`) ON DELETE CASCADE,
  CONSTRAINT `carrito_videojuegos_ibfk_2` FOREIGN KEY (`game_platform`) REFERENCES `videojuego_plataforma` (`game_platform`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito_videojuegos`
--

LOCK TABLES `carrito_videojuegos` WRITE;
/*!40000 ALTER TABLE `carrito_videojuegos` DISABLE KEYS */;
INSERT INTO `carrito_videojuegos` VALUES
(1,2,1),
(1,10,1),
(1,18,1),
(1,21,1),
(1,22,1),
(2,1,2),
(2,15,1),
(2,21,1),
(2,26,1);
/*!40000 ALTER TABLE `carrito_videojuegos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domicilio`
--

DROP TABLE IF EXISTS `domicilio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `domicilio` (
  `id_domicilio` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `estado` varchar(50) NOT NULL,
  `ciudad` varchar(50) NOT NULL,
  `codigoPostal` varchar(15) NOT NULL,
  `calle` varchar(30) NOT NULL,
  `colonia` varchar(40) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_domicilio`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `domicilio_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domicilio`
--

LOCK TABLES `domicilio` WRITE;
/*!40000 ALTER TABLE `domicilio` DISABLE KEYS */;
INSERT INTO `domicilio` VALUES
(1,8,'Edomex','Tex','56150','Cedros','Salitreria','100','2024-11-25 22:45:21','2024-11-25 22:45:21'),
(2,8,'Edomex','Ecatepunk','51242','a','b','1023','2024-11-25 22:58:15','2024-11-25 22:58:15'),
(3,8,'a','a','55623','a','a','a','2024-11-25 22:58:52','2024-11-25 22:58:52'),
(4,8,'a','a','55623','a','a','ava','2024-11-25 22:59:49','2024-11-25 22:59:49'),
(5,8,'sda','asdas','56531','asda','asdasd','1234','2024-11-25 23:00:49','2024-11-25 23:00:49'),
(6,8,'alo','asdas','56531','asda','asdasd','1234','2024-11-25 23:01:14','2024-11-25 23:01:14'),
(7,8,'es','sa','12345','sa','as','as','2024-11-25 23:02:35','2024-11-25 23:02:35'),
(8,8,'fff','fff','12345','ffff','ffff','1','2024-11-25 23:03:41','2024-11-25 23:03:41'),
(9,8,'ikk','as','45678','asa','cc','2','2024-11-25 23:05:38','2024-11-25 23:05:38'),
(10,8,'ddd','ddd','44444','ddd','dd','dd','2024-11-25 23:06:11','2024-11-25 23:06:11'),
(11,9,'Edomex','Texcoco','56150','Cedros','Salitreria','100','2024-11-26 00:28:20','2024-11-26 00:28:20');
/*!40000 ALTER TABLE `domicilio` ENABLE KEYS */;
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
  `tarjeta_tipo` varchar(10) NOT NULL,
  `card_number` varchar(16) NOT NULL,
  `fecha_vencimiento` date NOT NULL,
  `cvv` char(3) NOT NULL,
  PRIMARY KEY (`payment_method_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `forma_pago_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forma_pago`
--

LOCK TABLES `forma_pago` WRITE;
/*!40000 ALTER TABLE `forma_pago` DISABLE KEYS */;
INSERT INTO `forma_pago` VALUES
(1,8,'Crédito','1234567890123456','2001-11-21','123'),
(2,9,'Crédito','1231312312312312','2001-12-21','111');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plataforma`
--

LOCK TABLES `plataforma` WRITE;
/*!40000 ALTER TABLE `plataforma` DISABLE KEYS */;
INSERT INTO `plataforma` VALUES
(1,'Xbox','Lo mejor de microsoft para el mundo'),
(2,'PlayStation','Lo mejor de Sony para el mundo'),
(3,'Nintendo','Los mejores clasicos y no tan clasicos');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES
(1,'Usuario','Consumidor de los productos'),
(2,'Empleado','Administrador de los juegos'),
(3,'Admin','Administrador de usuarios');
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
  `telefonoUsuario` varchar(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `passwd` varchar(255) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `confirmar` tinyint(1) DEFAULT 0,
  `token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `rol` (`role_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES
(8,'Isaac Abraham','De Ramon','Perez','5581399680','isaacdp09@gmail.com','$2b$10$4z3w8C83NWu.28fC8yZjQOJdumATuWCpIEw1j8vRXU4NewTQM1Gpq',1,'2024-11-25 20:34:06','2024-11-25 22:23:12',1,NULL),
(9,'Zenon','De Ramon','Ramos','5520573377','derz64@hotmail.com','$2b$10$vJTzcjZbmo..eKRB9HsAjOjWnIs4oPg7g2GLn.l7nonxCiq1lUGEu',1,'2024-11-26 00:26:34','2024-11-26 00:27:22',1,NULL),
(10,'Misael','Bahena','Vargas','1231212312','demo1@demo.com','$2b$10$bFZyZTbrukwpYD334DHiLu2NVWzpNDYxhjVJzvYM7Lz1qz3sp3h.S',1,'2024-11-26 05:38:56','2024-11-26 05:39:34',1,NULL);
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
  `price` decimal(10,2) NOT NULL CHECK (`price` >= 0),
  `stock` int(11) NOT NULL CHECK (`stock` >= 0),
  PRIMARY KEY (`game_platform`),
  KEY `game_id` (`game_id`),
  KEY `platform_id` (`platform_id`),
  CONSTRAINT `videojuego_plataforma_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `videojuegos` (`game_id`) ON DELETE CASCADE,
  CONSTRAINT `videojuego_plataforma_ibfk_2` FOREIGN KEY (`platform_id`) REFERENCES `plataforma` (`platform_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videojuego_plataforma`
--

LOCK TABLES `videojuego_plataforma` WRITE;
/*!40000 ALTER TABLE `videojuego_plataforma` DISABLE KEYS */;
INSERT INTO `videojuego_plataforma` VALUES
(1,50,1,59.99,100),
(2,51,2,59.99,100),
(3,52,3,69.99,100),
(4,53,1,59.99,100),
(5,54,2,49.99,100),
(6,55,3,39.99,100),
(7,56,1,49.99,100),
(8,57,2,59.99,100),
(9,58,3,69.99,100),
(10,59,1,49.99,100),
(11,60,2,59.99,100),
(12,61,3,69.99,100),
(13,62,1,59.99,100),
(14,63,2,49.99,100),
(15,64,3,29.99,100),
(16,65,1,59.99,100),
(17,66,2,59.99,100),
(18,67,3,69.99,100),
(19,68,3,59.99,100),
(20,70,2,59.99,100),
(21,71,3,49.99,100),
(22,72,1,29.99,100),
(23,73,2,59.99,100),
(24,74,3,49.99,100),
(25,75,1,69.99,100),
(26,76,2,59.99,100),
(27,77,3,59.99,100),
(28,78,1,59.99,100),
(29,79,2,29.99,100),
(30,80,3,49.99,100);
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
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`game_id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videojuegos`
--

LOCK TABLES `videojuegos` WRITE;
/*!40000 ALTER TABLE `videojuegos` DISABLE KEYS */;
INSERT INTO `videojuegos` VALUES
(50,'Halo Infinite','Un emocionante shooter en primera persona para Xbox.','2021-12-08','halo_infinite.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(51,'The Legend of Zelda: Breath of the Wild','Un juego de mundo abierto lleno de aventuras para Nintendo.','2017-03-03','zelda_botw.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(52,'God of War Ragnarök','La épica continuación de la saga de Kratos para PlayStation.','2022-11-09','gow_ragnarok.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(53,'Forza Horizon 5','Un juego de carreras ambientado en México para Xbox.','2021-11-09','forza_horizon5.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(54,'Super Mario Odyssey','Un vibrante juego de plataformas para Nintendo.','2017-10-27','super_mario_odyssey.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(55,'The Last of Us Part II','Una historia intensa y emocional para PlayStation.','2020-06-19','tlou2.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(56,'Gears 5','Un juego de acción trepidante para Xbox.','2019-09-10','gears5.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(57,'Animal Crossing: New Horizons','Un simulador social encantador para Nintendo.','2020-03-20','animal_crossing_nh.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(58,'Horizon Forbidden West','Una aventura en un mundo abierto para PlayStation.','2022-02-18','horizon_fw.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(59,'Sea of Thieves','Una aventura pirata multijugador para Xbox.','2018-03-20','sea_of_thieves.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(60,'Metroid Dread','Una aventura de ciencia ficción para Nintendo.','2021-10-08','metroid_dread.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(61,'Gran Turismo 7','Una experiencia de simulación de carreras para PlayStation.','2022-03-04','gran_turismo7.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(62,'Psychonauts 2','Una extravagante aventura para Xbox.','2021-08-25','psychonauts2.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(63,'Mario Kart 8 Deluxe','Carreras locas y divertidas para Nintendo.','2017-04-28','mario_kart8.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(64,'Uncharted 4: A Thiefs End','Un épico viaje de acción y aventuras para PlayStation.','2016-05-10','uncharted4.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(65,'Fable','Un juego de rol de fantasía para Xbox.','2023-12-10','fable.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(66,'Splatoon 3','Un juego de disparos en equipo para Nintendo.','2022-09-09','splatoon3.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(67,'Ratchet & Clank: Rift Apart','Un juego de acción y aventuras interdimensional para PlayStation.','2021-06-11','ratchet_clank.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(68,'Elden Ring','Un RPG de mundo abierto aclamado por la crítica.','2022-02-25','elden_ring.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(69,'Elden Ring','Un RPG de mundo abierto también disponible en Xbox.','2022-02-25','elden_ring.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(70,'Bayonetta 3','Una historia de acción emocionante para Nintendo.','2022-10-28','bayonetta3.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(71,'Returnal','Un juego de acción y horror psicológico para PlayStation.','2021-04-30','returnal.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(72,'Ori and the Will of the Wisps','Una hermosa aventura de plataformas para Xbox.','2020-03-11','ori_wisps.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(73,'Pokemon Legends: Arceus','Un RPG de Pokémon en mundo abierto para Nintendo.','2022-01-28','pokemon_arceus.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(74,'Spider-Man: Miles Morales','Un juego de superhéroes para PlayStation.','2020-11-12','spiderman_mm.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(75,'Starfield','Un RPG de ciencia ficción y exploración para Xbox.','2023-09-06','starfield.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(76,'Kirby and the Forgotten Land','Un adorable juego de plataformas para Nintendo.','2022-03-25','kirby_forgotten.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(77,'Demons Souls','El aclamado remake para PlayStation.','2020-11-12','demons_souls.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(78,'Flight Simulator','Una experiencia de simulación para Xbox.','2020-08-18','flight_simulator.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(79,'Donkey Kong Country: Tropical Freeze','Un desafiante juego de plataformas para Nintendo.','2014-05-02','dk_tropical.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(80,'Ghost of Tsushima','Una épica historia de samuráis para PlayStation.','2020-07-17','ghost_tsushima.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(81,'Halo: Master Chief Collection','La colección completa de Halo para Xbox.','2014-11-11','halo_mcc.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(82,'Fire Emblem: Three Houses','Un RPG táctico para Nintendo.','2019-07-26','fire_emblem.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(83,'The Last Guardian','Un conmovedor juego de aventuras para PlayStation.','2016-12-06','last_guardian.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(84,'Cuphead','Un desafiante juego de plataformas para Xbox.','2017-09-29','cuphead.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(85,'Luigis Mansion 3','Un encantador juego de aventuras para Nintendo.','2019-10-31','luigis_mansion3.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(86,'Infamous: Second Son','Un juego de superpoderes para PlayStation.','2014-03-21','infamous_second.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(87,'Gears Tactics','Un juego de estrategia por turnos para Xbox.','2020-04-28','gears_tactics.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(88,'Xenoblade Chronicles 3','Un épico RPG para Nintendo.','2022-07-29','xenoblade3.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31'),
(89,'Detroit: Become Human','Una narrativa interactiva para PlayStation.','2018-05-25','detroit.jpg','2024-11-25 03:25:31','2024-11-25 03:25:31');
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

-- Dump completed on 2024-11-25 23:42:44
