import mongoose from "mongoose";

const Car = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
    fuel: { type: String, required: true },
    mileage: { type: String, required: true },
    sizeTank: { type: String, required: true },
    engineType: { type: String, default: "-" },
    engineDisplacement: { type: String, default: "-" },
    enginePower: { type: String, default: "-" },
  },
  { timestamps: true }
);

export default mongoose.model("Car", Car);
