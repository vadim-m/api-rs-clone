import express from "express";
import mongoose from "mongoose";

const PORT = 3000;
const DB_USER = "rs-client";
const DB_PASS = "ohPiDM9NUxzSxawj";
const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASS}@rs-cluster.zay4fzg.mongodb.net/?retryWrites=true&w=majority`;

const app = express();
app.use(express.json());

app.post("/", (req, res) => {
  return res.status(200).json("Сервер запущен!");
});

async function startApp() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log("server started"));
  } catch (e) {
    console.warn(e.message);
  }
}

startApp();
