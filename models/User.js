import { Schema, model } from "mongoose";

const User = Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    hasCar: { type: Boolean, default: false },
    carId: { type: String },
    language: { type: String, default: "RU" },
    currency: { type: String, default: "₽" },
    units: { type: String, default: "Europe" },
  },
  { timestamps: true }
);

export default model("User", User);
