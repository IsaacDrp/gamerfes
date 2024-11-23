import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Rol from "./Rol.js";
import Carrito from "./Carrito.js";

export const Usuario = db.define(
    "usuarios",
    {
        user_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        apellido_paterno: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        apellido_materno: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        telefonoUsuario: {
            type: Sequelize.STRING(10),
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        passwd: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        role_id: {
            type: Sequelize.INTEGER,
        },
    },
    { timestamps: false }
);

Rol.hasMany(Usuario, {
    foreignKey: { name: "role_id" },
});
Usuario.belongsTo(Rol, {
    foreignKey: { name: "role_id" },
});

Usuario.hasOne(Carrito, {
    foreignKey: { name: "user_id" },
});
Carrito.belongsTo(Usuario, {
    foreignKey: { name: "user_id" },
});

export default Usuario;
