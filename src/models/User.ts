import { DataTypes, Model } from "sequelize";
import { sequelize } from "../middlewares/databaseConfig";

export class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
    public email!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: "users",
    modelName: "User",
    timestamps: true,
});