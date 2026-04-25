import express from "express";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import  sequelize  from "./db/connection.db.js";
import "./db/models/index.js";

const port = process.env.DB_PORT || 3000;
const app = express(); 

async function bootstrap() {
  //convert buffer data
  app.use(express.json());

  //cors
  app.use(cors());

  //db
  
  console.log("DB connected ✅");
  await sequelize.sync();

  //routes
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.all("{/*dummy}", (req, res) => {
    res.status(404).json({ message: "in-valid app routing" });
  });

  app.listen(port, () => {
    console.log(`black-biller app listening on port ${port}`);
  });
}

export default bootstrap;
