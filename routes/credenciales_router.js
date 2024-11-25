import express from "express";
import { renderLoginPage, renderRegisterPage } from "../controllers/credenciales_controller.js";


const Credenciales_router = express.Router();

Credenciales_router.get("/login",  renderLoginPage);
Credenciales_router.get("/registro",  renderRegisterPage);

export default Credenciales_router;
