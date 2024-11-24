import express from "express";
import { renderMainPage } from "../controllers/productos_controller.js";

const router = express.Router();

// Ruta principal de productos
router.get("/", renderMainPage);

export default router;
