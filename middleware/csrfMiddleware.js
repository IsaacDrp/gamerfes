import csurf from 'csurf';
import cookieParser from 'cookie-parser';

const csrfMiddleware = (app) => {
    // Middleware para parsear cookies
    app.use(cookieParser());

    // Configuración de csurf para usar cookies
    app.use(
        csurf({
            cookie: true,
        })
    );

    // Middleware para manejar errores de CSRF
    app.use((err, req, res, next) => {
        if (err.code === 'EBADCSRFTOKEN') {
            return res.status(403).json({ message: 'Token CSRF inválido o faltante.' });
        }
        next();
    });
};

export default csrfMiddleware;
