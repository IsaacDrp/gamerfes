--- Base de datos de la tienda
SET NAMES 'latin1';
DROP DATABASE IF EXISTS gamerfes;
CREATE DATABASE gamerfes;
USE gamerfes;

-- Tabla de roles
CREATE TABLE rol (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    descripcion TEXT
)DEFAULT CHARACTER SET utf8;

-- Tabla de usuarios
CREATE TABLE usuario (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    apellido_paterno VARCHAR(50) NOT NULL,
    apellido_materno VARCHAR(50) NOT NULL,
    telefonoUsuario VARCHAR(10) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES rol(role_id)
)DEFAULT CHARACTER SET utf8;

--cuenta de los usuarios
CREATE TABLE cuenta(
    user_id INT,
    email VARCHAR(100) UNIQUE NOT NULL,
    passwd VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id)
)DEFAULT CHARACTER SET utf8;
--- Domicilio
CREATE TABLE domicilio(
    id_domicilio INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    estado VARCHAR(50) NOT NULL,
    ciudad VARCHAR(50) NOT NULL,
    codigoPostal VARCHAR(15) NOT NULL,
    calle VARCHAR(30) NOT NULL,
    colonia VARCHAR(40) NOT NULL,
    numeroCasa VARCHAR(10) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id)
)DEFAULT CHARACTER SET utf8;

-- Tabla de métodos de pago
CREATE TABLE forma_pago (
    payment_method_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    tarjeta_tipo VARCHAR(10) NOT NULL,
    card_number VARCHAR(16) NOT NULL,
    fecha_Vencimiento DATE NOT NULL,
    cvv VARCHAR(4) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id)
)DEFAULT CHARACTER SET utf8;

-- Tabla de carritos
CREATE TABLE carrito (
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    impuestos DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    total DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method_id INT,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id),
    FOREIGN KEY (payment_method_id) REFERENCES forma_pago(payment_method_id)
)DEFAULT CHARACTER SET utf8;

-- Tabla de videojuegos
CREATE TABLE videojuegos (
    game_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    
    release_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)DEFAULT CHARACTER SET utf8;

-- Tabla de plataformas
CREATE TABLE plataforma (
    platform_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT
)DEFAULT CHARACTER SET utf8;

-- Tabla intermedia videojuego-plataforma
CREATE TABLE videojuego_plataforma (
    game_platform INT PRIMARY KEY AUTO_INCREMENT,
    game_id INT,
    platform_id INT,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    FOREIGN KEY (game_id) REFERENCES videojuegos(game_id),
    FOREIGN KEY (platform_id) REFERENCES plataforma(platform_id)
)DEFAULT CHARACTER SET utf8;

-- Tabla intermedia carrito-videojuegos
CREATE TABLE carrito_videojuegos (
    cart_id INT,
    game_platform INT,
    quantity INT NOT NULL,
    PRIMARY KEY (cart_id, game_platform),
    FOREIGN KEY (cart_id) REFERENCES carrito(cart_id),
    FOREIGN KEY (game_platform) REFERENCES videojuego_plataforma(game_platform)
)DEFAULT CHARACTER SET utf8;