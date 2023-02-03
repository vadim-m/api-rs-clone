import express from "express";

const PORT = 3000;

const app = express();
app.use(express.json());

app.post("/", (req, res) => {
  return res.status(200).json("Сервер запущен!");
});

app.listen(PORT, () => {
  console.log("server started");
});
