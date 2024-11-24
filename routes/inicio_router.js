import express from "express";
import { renderMainPage } from "../controllers/productos_controller.js";
import { renderUserPage } from "../controllers/productos_controller.js";
import { renderForms } from "../controllers/productos_controller.js";

const router = express.Router();

router.get("/", renderMainPage);
router.get("/infoUsuario",renderUserPage);
router.get("/infoUsuario/formularios/:id", renderForms);

export default router;
