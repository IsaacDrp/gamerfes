// authMiddleware.js

const authMiddleware = (req, res, next) => {
    const token = req.cookies._token;
    const userEmail = req.cookies.userEmail;
    // Verificar si existe el token y el correo del usuario en las cookies
    if (!token || !userEmail) {
        return res.redirect("/credenciales/login"); // Redirigir si no está autenticado
    }

    // Si ambos están presentes, continuar con la ejecución de la ruta
    // Aquí podrías agregar una validación adicional del token si lo necesitas
    next();
};

export default authMiddleware;
