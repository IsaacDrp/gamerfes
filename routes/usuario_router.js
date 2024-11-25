import express from "express";
import { renderUserPage } from "../controllers/usuario_controller.js";


const usuario_router = express.Router();

usuario_router.get("/infoUsuario", renderUserPage );

export default usuario_router;
