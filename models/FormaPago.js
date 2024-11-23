import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Usuario from "./Usuario.js";

export const FormaPago = db.define(
    "formas_pago",
    {
        payment_method_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        tarjeta_tipo: {
            type: Sequelize.STRING(10),
            allowNull: false,
        },
        card_number: {
            type: Sequelize.STRING(16),
            allowNull: false,
        },
        fecha_vencimiento: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        cvv: {
            type: Sequelize.STRING(3),
            allowNull: false,
        },
    },
    { timestamps: false }
);

Usuario.hasMany(FormaPago, {
    foreignKey: { name: "user_id" },
});
FormaPago.belongsTo(Usuario, {
    foreignKey: { name: "user_id" },
});

export default FormaPago;
