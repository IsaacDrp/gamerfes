import Videojuego from "../models/Videojuegos.js";
import VideojuegoPlataforma from "../models/VideojuegoPlataforma.js";
import Plataforma from "../models/Plataforma.js";
import Usuario from "../models/Usuario.js";
import Carrito from "../models/Carrito.js";
import CarritoVideojuegos from "../models/Carrito_videojuegos.js";

import { cookie } from "express-validator";

// Controlador para listar videojuegos
export const obtenerVideojuegos = async (req, res) => {
    try {
        // Obtener videojuegos junto con su precio, stock, plataforma y game_platform
        const videojuegos = await Videojuego.findAll({
            include: [
                {
                    model: VideojuegoPlataforma,
                    include: [
                        {
                            model: Plataforma,
                            attributes: ["name"], // Nombre de la plataforma
                        },
                    ],
                    attributes: ["price", "stock", "game_platform"], // Precio, stock y plataforma del juego
                },
            ],
        });

        // Transformar la estructura de datos
        const juegosFormateados = videojuegos.map((juego) => {
            const videojuegoPlataforma = juego.videojuego_plataformas[0];
            const plataforma = videojuegoPlataforma?.plataforma?.name || "Desconocida";

            return {
                game_id: juego.game_id,
                title: juego.title,
                description: juego.description,
                image_src: juego.image_src,
                price: videojuegoPlataforma?.price || 0,
                stock: videojuegoPlataforma?.stock || 0,
                plataforma,
                game_platform: videojuegoPlataforma?.game_platform || "N/A",
            };
        });

        // Renderizar con datos al template
        res.render("main.pug", { 
            juegos: juegosFormateados,
            csrf: req.csrfToken(),
        });
    } catch (error) {
        console.error("Error al obtener videojuegos:", error);
        res.status(500).send("Error al cargar los videojuegos.");
    }
};


// Controlador para agregar un videojuego al carrito
export const agregarAlCarrito = async (req, res) => {
    try {
        const { game_id } = req.body;

        if (!game_id) {
            return res.status(400).send("El ID del juego es necesario.");
        }

        // Validar si el juego existe y obtener datos adicionales
        const juego = await Videojuego.findByPk(game_id, {
            include: [
                {
                    model: VideojuegoPlataforma,
                    attributes: ["game_platform"], // Incluye solo el campo game_platform
                },
            ],
        });

        if (!juego) {
            return res.status(404).send("Juego no encontrado.");
        }

        // Variables adicionales
        const vistas = juego.vistas || 0; // Considerando que "vistas" es un campo del modelo Videojuego
        const gamePlatform = juego.videojuego_plataformas?.[0]?.game_platform || "Desconocido";

        // Extraer el email del usuario desde las cookies
        const userEmail = req.cookies.userEmail;

        if (!userEmail) {
            return res.status(401).send("Usuario no autenticado.");
        }

        // Buscar el usuario por su correo electrónico
        const usuario = await Usuario.findOne({
            where: { email: userEmail },
            include: [Carrito], // Incluir la relación con el carrito
        });

        if (!usuario) {
            return res.status(404).send("Usuario no encontrado.");
        }

        // Verificar si ya tiene un carrito, si no, crearlo
        let carrito = usuario.carrito;
        if (!carrito) {
            carrito = await Carrito.create({
                user_id: usuario.user_id, // Relacionar el carrito con el usuario
            });
        }

        // Verificar si ya existe una relación en la tabla intermedia
        const [carritoVideojuego, created] = await CarritoVideojuegos.findOrCreate({
            where: {
                cart_id: carrito.cart_id,
                game_platform: gamePlatform, // Vincular por plataforma de juego
            },
            defaults: {
                quantity: 1, // Si no existe, se establece la cantidad inicial
            },
        });

        // Si ya existía, incrementar la cantidad
        if (!created) {
            carritoVideojuego.quantity += 1;
            await carritoVideojuego.save();
        }

        // Renderizar página con las variables vistas y game_platform
        res.redirect("/");
    } catch (error) {
        console.error("Error al agregar al carrito:", error);
        res.status(500).send("Error al agregar al carrito.");
    }
};


export default {
    obtenerVideojuegos,
    agregarAlCarrito
}