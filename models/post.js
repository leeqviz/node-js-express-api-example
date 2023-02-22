import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db-connection.js";

export const Post = sequelize.define('posts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    viewsCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    tags: {
        type: DataTypes.STRING,
        get() {
            return this.getDataValue('tags')?.split(',')
        },
        set(val) {
           this.setDataValue('tags', val?.join(','));
        },
    },
    imageUrl: DataTypes.STRING
});