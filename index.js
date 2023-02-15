import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import carsRouter from "./routes/cars.js";
dotenv.config();

// App
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api", carsRouter);

async function startApp() {
  try {
    mongoose.set("strictQuery", false);
    const connect = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DB host: ${connect.connection.host}`);

    app.listen(process.env.PORT, () => console.log("server started"));
  } catch (e) {
    console.warn(e.message);
  }
}

startApp();
