import express from "express";
import {
    renderRegisterPage,
    renderLoginPage,
    registrar,  
    credenciales,
    confirmarRegistroPorEnlace} from "../controllers/credenciales_controller.js";

const Credenciales_router = express.Router();

Credenciales_router.get("/login",  renderLoginPage);
Credenciales_router.get("/registro",  renderRegisterPage);
Credenciales_router.post("/registrar", registrar);
Credenciales_router.post("/acceder", credenciales)
Credenciales_router.get("/confirmar/:token", confirmarRegistroPorEnlace)

export default Credenciales_router;
