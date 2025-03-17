import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("todo_db", "ags", "ags@123", {
    host: "localhost",
    dialect: "mysql",
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected successfully");
    } catch (error) {
        console.error("❌ Error connecting to database:", error);
    }
};
