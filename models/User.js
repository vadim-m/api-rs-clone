import { Schema, model } from "mongoose";

const User = Schema({
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
});

export default model("User", User);
