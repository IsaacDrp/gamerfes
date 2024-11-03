CREATE DATABASE gamerfes;
USE gamerfes;

-- Tabla de roles
CREATE TABLE rol (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    descripcion TEXT
);

-- Tabla de usuarios
CREATE TABLE usuario (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    apellido_paterno VARCHAR(50) NOT NULL,
    apellido_materno VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    passwd VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES rol(role_id)
);

-- Tabla de métodos de pago
CREATE TABLE forma_pago (
    payment_method_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    type ENUM('credit_card', 'debit_card', 'paypal', 'crypto') NOT NULL,
    card_number VARCHAR(16),
    expiry_date DATE,
    is_default BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES usuario(user_id)
);

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
);

-- Tabla de videojuegos
CREATE TABLE videojuegos (
    game_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    
    release_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de plataformas
CREATE TABLE plataforma (
    platform_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT
);

-- Tabla intermedia videojuego-plataforma
CREATE TABLE videojuego_plataforma (
    game_platform INT PRIMARY KEY AUTO_INCREMENT,
    game_id INT,
    platform_id INT,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    FOREIGN KEY (game_id) REFERENCES videojuegos(game_id),
    FOREIGN KEY (platform_id) REFERENCES plataforma(platform_id)
);


-- Tabla intermedia carrito-videojuegos
CREATE TABLE carrito_videojuegos (
    cart_id INT,
    game_platform INT,
    quantity INT NOT NULL,
    PRIMARY KEY (cart_id, game_platform),
    FOREIGN KEY (cart_id) REFERENCES carrito(cart_id),
    FOREIGN KEY (game_platform) REFERENCES videojuego_plataforma(game_platform)
);
