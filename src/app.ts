import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB, sequelize } from "./middlewares/databaseConfig";
import logger from "./middlewares/LoggerConfig";
import { setupSwagger } from "./middlewares/swaggerConfig";
import authRoute from "./routes/authRoute";
import postRoutes from "./routes/postRoutes";
import todoRoutes from "./routes/todoRoutes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", todoRoutes);
app.use("/auth", authRoute);
app.use("/api", postRoutes);

if (process.env.NODE_ENV === "development") {
    setupSwagger(app);
    logger.info("Running in development mode");
} else {
    logger.info("Running in production mode");
}

const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envFile });

const startServer = async () => {
    await connectDB();
    await sequelize.sync({ force: false });
    app.listen(5000, () => logger.info(`Server running on port 5000 in ${process.env.NODE_ENV} mode`));
};

startServer().then(r => console.log("Server started successfully", r));