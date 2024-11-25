import express from "express";
import {
    renderRegisterPage,
    renderLoginPage,
    registrar  } from "../controllers/credenciales_controller.js";

const Credenciales_router = express.Router();

Credenciales_router.get("/login",  renderLoginPage);
Credenciales_router.get("/registro",  renderRegisterPage);
Credenciales_router.post("/registrar", registrar);

export default Credenciales_router;
