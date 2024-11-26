import express from "express";
import { obtenerVideojuegos, agregarAlCarrito } from "../controllers/productos_controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const inicio_router = express.Router();

// Ruta para obtener videojuegos (GET)
inicio_router.get("/", obtenerVideojuegos);



inicio_router.post("/agregar", authMiddleware, (req, res) => {
    const userEmail = req.cookies.userEmail; // Obtener el correo del usuario desde la cookie

    // Aquí puedes hacer lo que necesites con el correo, por ejemplo, cargar la información del usuario
    agregarAlCarrito(req, res, userEmail);
});
export default inicio_router;
