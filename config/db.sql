SET NAMES 'latin1';
DROP DATABASE IF EXISTS gamerfes;
CREATE DATABASE gamerfes;
USE gamerfes;

-- Tabla de roles
CREATE TABLE rol (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    descripcion TEXT
) DEFAULT CHARACTER SET utf8;

-- Tabla de usuarios
CREATE TABLE usuario (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    apellido_paterno VARCHAR(50) NOT NULL,
    apellido_materno VARCHAR(50) NOT NULL,
    telefonoUsuario VARCHAR(10) NOT NULL,
    email VARCHAR(255) NOT NULL,
    passwd VARCHAR(255) NOT NULL,
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES rol(role_id) ON DELETE SET NULL
) DEFAULT CHARACTER SET utf8;

-- Tabla de carritos
CREATE TABLE carrito (
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    impuestos DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    total DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8;

-- Tabla de domicilios
CREATE TABLE domicilio (
    id_domicilio INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    estado VARCHAR(50) NOT NULL,
    ciudad VARCHAR(50) NOT NULL,
    codigoPostal VARCHAR(15) NOT NULL,
    calle VARCHAR(30) NOT NULL,
    colonia VARCHAR(40) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8;

-- Tabla de métodos de pago
CREATE TABLE forma_pago (
    payment_method_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    tarjeta_tipo VARCHAR(10) NOT NULL,
    card_number VARCHAR(16) NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    cvv CHAR(3) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8;

-- Tabla de videojuegos
CREATE TABLE videojuegos (
    game_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    release_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) DEFAULT CHARACTER SET utf8;

-- Tabla de plataformas
CREATE TABLE plataforma (
    platform_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT
) DEFAULT CHARACTER SET utf8;

-- Tabla intermedia videojuego-plataforma
CREATE TABLE videojuego_plataforma (
    game_platform INT PRIMARY KEY AUTO_INCREMENT,
    game_id INT,
    platform_id INT,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    stock INT NOT NULL CHECK (stock >= 0),
    FOREIGN KEY (game_id) REFERENCES videojuegos(game_id) ON DELETE CASCADE,
    FOREIGN KEY (platform_id) REFERENCES plataforma(platform_id) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8;

-- Tabla intermedia carrito-videojuegos
CREATE TABLE carrito_videojuegos (
    cart_id INT,
    game_platform INT,
    quantity INT NOT NULL CHECK (quantity > 0),
    PRIMARY KEY (cart_id, game_platform),
    FOREIGN KEY (cart_id) REFERENCES carrito(cart_id) ON DELETE CASCADE,
    FOREIGN KEY (game_platform) REFERENCES videojuego_plataforma(game_platform) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8;
SET NAMES 'latin1';
DROP DATABASE IF EXISTS gamerfes;
CREATE DATABASE gamerfes;
USE gamerfes;

-- Tabla de roles
CREATE TABLE rol (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    descripcion TEXT
) DEFAULT CHARACTER SET utf8;

-- Tabla de usuarios
CREATE TABLE usuario (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    apellido_paterno VARCHAR(50) NOT NULL,
    apellido_materno VARCHAR(50) NOT NULL,
    telefonoUsuario VARCHAR(10) NOT NULL,
    email VARCHAR(255) NOT NULL,
    passwd VARCHAR(255) NOT NULL,
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES rol(role_id) ON DELETE SET NULL
) DEFAULT CHARACTER SET utf8;

-- Tabla de carritos
CREATE TABLE carrito (
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    impuestos DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    total DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8;

-- Tabla de domicilios
CREATE TABLE domicilio (
    id_domicilio INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    estado VARCHAR(50) NOT NULL,
    ciudad VARCHAR(50) NOT NULL,
    codigoPostal VARCHAR(15) NOT NULL,
    calle VARCHAR(30) NOT NULL,
    colonia VARCHAR(40) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8;

-- Tabla de métodos de pago
CREATE TABLE forma_pago (
    payment_method_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    tarjeta_tipo VARCHAR(10) NOT NULL,
    card_number VARCHAR(16) NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    cvv CHAR(3) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8;

-- Tabla de videojuegos
CREATE TABLE videojuegos (
    game_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    release_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) DEFAULT CHARACTER SET utf8;

-- Tabla de plataformas
CREATE TABLE plataforma (
    platform_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT
) DEFAULT CHARACTER SET utf8;

-- Tabla intermedia videojuego-plataforma
CREATE TABLE videojuego_plataforma (
    game_platform INT PRIMARY KEY AUTO_INCREMENT,
    game_id INT,
    platform_id INT,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    stock INT NOT NULL CHECK (stock >= 0),
    FOREIGN KEY (game_id) REFERENCES videojuegos(game_id) ON DELETE CASCADE,
    FOREIGN KEY (platform_id) REFERENCES plataforma(platform_id) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8;

-- Tabla intermedia carrito-videojuegos
CREATE TABLE carrito_videojuegos (
    cart_id INT,
    game_platform INT,
    quantity INT NOT NULL CHECK (quantity > 0),
    PRIMARY KEY (cart_id, game_platform),
    FOREIGN KEY (cart_id) REFERENCES carrito(cart_id) ON DELETE CASCADE,
    FOREIGN KEY (game_platform) REFERENCES videojuego_plataforma(game_platform) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8;
