import { Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/db.js";
import Rol from "./Rol.js";
import Carrito from "./Carrito.js";

export const Usuario = db.define(
    "usuario",
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
        confirmar: {
            type: Sequelize.INTEGER,
        },
        token: {
            type: Sequelize.STRING,
        },
    },
    {
        hooks: {
            beforeCreate: async function (usuario) {
                const salt = await bcrypt.genSalt(10);
                usuario.passwd = await bcrypt.hash(usuario.passwd, salt);
            },
        },
        scopes: {
            eliminarClave: {
                attributes: {
                    exclude: ["token", "passwd", "confirmar", "role_id"],
                },
            },
        },
        freezeTableName: true, // Evita la pluralización del nombre de la tabla
        timestamps: false,    // Desactiva las columnas automáticas createdAt y updatedAt
    }
);

// Relaciones con otros modelos
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

// Método de instancia para verificar contraseñas
Usuario.prototype.verificandoClave = function (password) {
    return bcrypt.compareSync(password, this.passwd);
};

export default Usuario;
