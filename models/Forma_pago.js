import { Sequelize } from "sequelize";
import {Usuario} from "./Usuario.js";
import db from "../config/db.js";

export const Forma_pago = db.define(
    "forma_pago", {
        payment_method_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        type: {
            type: Sequelize.DataTypes.ENUM('credit_card','debit_card','paypal','crypto')
        },
        card_number: {
            type: Sequelize.STRING
        },
        expiry_date: {
            type: Sequelize.DATE
        },
        is_default: {
            type: Sequelize.BOOLEAN
        }
    },
    {timestamps: false}
);

Usuario.hasOne(Forma_pago, {
    foreignKey: {
        name: "user_id"
    }
});

Forma_pago.belongsTo(Usuario, {
    foreignKey: {
        name: "user_id"
    }
});
export default {Forma_pago};

