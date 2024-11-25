import Usuario from "../models/Usuario.js";

export const renderRegisterPage = (req, res) => {
    res.render("crud_usuario/registro.pug");
};

export const renderLoginPage = (req, res) => {
    res.render("crud_usuario/login.pug");
}


export default {
    renderRegisterPage,
    renderLoginPage
}