import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes";
import {setupSwagger} from "./middlewares/swaggerConfig";
import {connectDB, sequelize} from "./middlewares/databaseConfig";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", todoRoutes);
setupSwagger(app);

const startServer = async () => {
    await connectDB();
    await sequelize.sync({ force: false });
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
};

startServer().then(r => console.log("Server started successfully", r));
