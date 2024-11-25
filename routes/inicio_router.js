import express from "express";
import { renderMainPage } from "../controllers/productos_controller.js";

const router = express.Router();

router.get("/", renderMainPage);

export default router;
