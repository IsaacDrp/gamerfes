import { Sequelize } from "sequelize";
import db from "../config/db.js";

// Definición del modelo Videojuego
export const Videojuego = db.define(
    "videojuegos",
    {
        game_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        release_date: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        image_src: {
            type: Sequelize.STRING(50),
            allowNull: true,
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal(
                "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
            ),
        },
    },
    { timestamps: false } // timestamps automáticos ya están definidos explícitamente
);

// Función para configurar las relaciones
export const associateVideojuego = (models) => {
    Videojuego.belongsTo(models.Carrito, {
        foreignKey: "cart_id",
        onDelete: "CASCADE",
    });

    Videojuego.belongsTo(models.VideojuegoPlataforma, {
        foreignKey: "game_platform",
        onDelete: "CASCADE",
    });
};

export default Videojuego;
