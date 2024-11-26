import express from 'express';

const router = express.Router();

router.get('/registro', (req, res) => {
    const csrfToken = req.csrfToken(); // Generar el token CSRF
    res.render('registro', { csrfToken });
});

router.post('/registro', (req, res) => {
    // Aquí manejas los datos del formulario de registro
    const { username, email, passwd } = req.body;
    console.log('Datos recibidos:', { username, email, passwd });

    res.json({ message: 'Usuario registrado correctamente.' });
});

export default router;
