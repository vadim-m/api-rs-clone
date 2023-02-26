import { Schema, model } from "mongoose";

const User = Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    hasCar: { type: Boolean, default: false },
    carId: { type: Schema.Types.ObjectId, ref: "Car" },
    language: { type: String, default: "RU" },
    currency: { type: String, default: "₽" },
    darkTheme: { type: Boolean, default: false },
    predictMileage: { type: Boolean, default: false },
    rememberPriceFuel: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model("User", User);
