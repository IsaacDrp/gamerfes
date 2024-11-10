import { Sequelize } from "sequelize";
import {Usuario} from "./Usuario.js";
import { Forma_pago } from "./Forma_pago.js";
import db from "../config/db.js"

export const Carrito = db.define (
    "carrito", {
        cart_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        subtotal: {
            type: Sequelize.DECIMAL(2,10)
        },
        impuestos: {
            type: Sequelize.DECIMAL(2,10)
        },
        total: {
            type: Sequelize.DECIMAL(2,10)
        },
        created_at: {
            type: Sequelize.DATE
        },
        payment_method_id: {
            type: Sequelize.INTEGER
        }
    },
    {timestamps: false}
);

//relacion con el usuario
Usuario.hasOne(Carrito, {
    foreignKey: {
        name: "user_id"
    }
});

Carrito.belongsTo(Usuario, {
    foreignKey: {
        name: "user_id"
    }
});

//relacion con la forma de pago
Forma_pago.hasOne(Carrito, {
    foreignKey: {
        name: "payment_method_id"
    }
});

Carrito.belongsTo(Forma_pago, {
    foreignKey: {
        name: "payment_method_id"
    }
});

export default Carrito;