import express from"express";
import { register, showRegister } from "../controllers/Register_controller.js";

const router_crud_ingreso = express.Router();

//routing

router_crud_ingreso.get('/registro', showRegister);
router_crud_ingreso.get('/altaUsuario', register);

export default router_crud_ingreso;