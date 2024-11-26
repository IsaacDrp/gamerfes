import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { renderCartPage } from "../controllers/carrito_controller.js";

const carrito_router = express.Router();

// Ruta para obtener videojuegos (GET)
carrito_router.get("/", renderCartPage);


export default carrito_router;
