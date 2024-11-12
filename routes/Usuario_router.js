import express from "express";
import { User } from "../controllers/Usuario.js";

const router_usuario = express.Router();

//routing
router_usuario.get('/usuario', User)
export default router_usuario;