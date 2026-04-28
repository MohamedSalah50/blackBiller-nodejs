import sequelize from "./db/connection.db.js";
import express from "express";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import "./db/models/index.js";
import authController from "./modules/auth/auth.controller.js";
import { globalErrorHandling } from "./utils/response.js";

const port = process.env.PORT;
const app = express();

//db
sequelize
  .authenticate()
  .then(() => console.log("DB connected ✅"))
  .catch((err) => console.error("DB connection failed:", err.message));

async function bootstrap() {
  //convert buffer data
  app.use(express.json());

  //cors
  app.use(cors());

  //routes
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/api/auth", authController);

  app.all("{/*dummy}", (req, res) => {
    res.status(404).json({ message: "in-valid app routing" });
  });

  app.use(globalErrorHandling);

  app.listen(port, () => {
    console.log(`black-biller app listening on port ${port}`);
  });
}

export default bootstrap;
