import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Usuario from "./Usuario.js";

export const Domicilio = db.define(
    "domicilios",
    {
        id_domicilio: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        estado: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        ciudad: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        codigoPostal: {
            type: Sequelize.STRING(15),
            allowNull: false,
        },
        calle: {
            type: Sequelize.STRING(30),
            allowNull: false,
        },
        colonia: {
            type: Sequelize.STRING(40),
            allowNull: false,
        },
        numero: {
            type: Sequelize.STRING(10),
            allowNull: false,
        },
    },
    { timestamps: false }
);

Usuario.hasMany(Domicilio, {
    foreignKey: { name: "user_id" },
});
Domicilio.belongsTo(Usuario, {
    foreignKey: { name: "user_id" },
});

export default Domicilio;
