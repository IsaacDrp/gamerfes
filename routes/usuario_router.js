import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { renderUserPage, renderForms, modify, addDom, addCard} from "../controllers/usuario_controller.js";


const usuario_router = express.Router();

usuario_router.get("/infousuario", authMiddleware, (req, res) => {
    const userEmail = req.cookies.userEmail; // Obtener el correo del usuario desde la cookie

    // Aquí puedes hacer lo que necesites con el correo, por ejemplo, cargar la información del usuario
    renderUserPage(req, res, userEmail);
});

usuario_router.get("/infousuario/formularios/:id", renderForms);
usuario_router.post("/modificar", modify);
usuario_router.post("/agregarDomicilio", addDom);
usuario_router.post("/agregarTarjeta", addCard);
export default usuario_router;
