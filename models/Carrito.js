import { Sequelize } from "sequelize";
import db from "../config/db.js";

export const Carrito = db.define(
    "carritos",
    {
        cart_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        subtotal: {
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0.0,
        },
        impuestos: {
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0.0,
        },
        total: {
            type: Sequelize.DECIMAL(10, 2),
            defaultValue: 0.0,
        },
    },
    { timestamps: false }
);

export default Carrito;
