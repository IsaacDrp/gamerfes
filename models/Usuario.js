import { Sequelize } from "sequelize";
import db from "../config/db.js"
import {Rol} from "./Rol.js";

export const Usuario = db.define(
    "usuario",
    {
        user_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING
        },
        apellido_paterno: {
            type: Sequelize.STRING
        },
        apellido_materno: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        passwd: {
            type: Sequelize.STRING
        },
        created_at: {
            type: Sequelize.DATE
        },
        role_id: {
            type: Sequelize.STRING
        },
    },
    {
        freezeTableName: true, // Evita la pluralización automática del nombre de la tabla
        tableName: "usuario",  // Especifica el nombre exacto de la tabla en la base de datos
    }
);


Rol.hasOne(Usuario, {
    foreignKey: {
        name: "role_id"
    }
});

Usuario.belongsTo(Rol,{
    foreignKey:{
        name:"role_id",
    },
});

export default {Usuario};