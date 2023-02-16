import { Schema, model } from "mongoose";

const User = Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
  carId: { type: String, default: "0" },
  language: { type: String, default: "RU" },
  currency: { type: String, default: "₽" },
  units: { type: String, default: "Europe" },
});

export default model("User", User);
