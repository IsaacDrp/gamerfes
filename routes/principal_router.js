import express from "express";
import { principal } from "../controllers/principal.js";

const router_principal = express.Router();
//routing
router_principal.get('/', principal)
export default router_principal;
