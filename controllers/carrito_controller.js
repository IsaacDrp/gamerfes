import Carrito from "../models/Carrito.js";
import Videojuego from "../models/Videojuegos.js";
import Usuario from "../models/Usuario.js";
import CarritoVideojuegos from "../models/Carrito_videojuegos.js";
import VideojuegoPlataforma from "../models/VideojuegoPlataforma.js";

export const renderCartPage = async (req, res) => {
    try {
        const userEmail = req.cookies.userEmail;

        if (!userEmail) {
            return res.status(401).send("Usuario no autenticado.");
        }

        // Buscar el usuario por email y obtener su carrito
        const usuario = await Usuario.findOne({
            where: { email: userEmail },
            include: [{ model: Carrito }], // Relación con el carrito
        });

        if (!usuario || !usuario.carrito) {
            return res.render("carrito.pug", {
                juegos: [],
                csrf: req.csrfToken(),
            });
        }

        const carritoId = usuario.carrito.cart_id;

        // Obtener los videojuegos del carrito, solo los valores necesarios
        const carrito_videojuegos = await CarritoVideojuegos.findAll({
            where: { cart_id: carritoId },
            attributes: ['quantity', 'game_platform'], // Solo obtener lo necesario
        });

        // Si no hay videojuegos en el carrito
        if (!carrito_videojuegos.length) {
            return res.render("carrito.pug", {
                juegos: [],
                csrf: req.csrfToken(),
            });
        }

        // Crear un arreglo con las plataformas y cantidades para hacer las siguientes consultas
        const videojuegosPlataformas = [];
        carrito_videojuegos.forEach(item => {
            videojuegosPlataformas.push({
                game_platform: item.game_platform,
                quantity: item.quantity,
            });
        });

        console.log(videojuegosPlataformas)

        // Ahora, hacer una consulta por cada plataforma de los videojuegos
        const plataformaDetalles = await Promise.all(
            videojuegosPlataformas.map(async (item) => {
                const plataforma = await VideojuegoPlataforma.findOne({
                    where: { game_platform: item.game_platform },
                    include: [{
                        model: Videojuego, // Incluir detalles del videojuego
                        attributes: ['title', 'image_src'],
                    }],
                });

                // Si la plataforma y el videojuego existen, devolver los detalles
                if (plataforma) {
                    return {
                        cantidad: item.quantity,
                        price: parseFloat(plataforma.price),
                        stock: plataforma.stock,
                        title: plataforma.videojuego.title,
                        image_src: plataforma.videojuego.image_src,
                        total: parseFloat(plataforma.price) * item.quantity,
                    };
                }
            })
        );

        // Filtrar las entradas nulas (en caso de que no se haya encontrado la plataforma o videojuego)
        const juegos = plataformaDetalles.filter(item => item !== undefined);

        console.log(juegos);
        
        // Renderizar la página con los datos
        res.render("carrito.pug", {
            juegos,
            csrf: req.csrfToken(),
        });
    } catch (error) {
        console.error("Error al renderizar el carrito:", error);
        res.status(500).send("Error al cargar el carrito.");
    }
};


export default {
    renderCartPage
}