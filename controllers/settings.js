import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import User from "../models/User.js";
dotenv.config();

class SettingsController {
  async getSettings(req, res) {
    try {
      const userID = req.headers["user-id"];
      const user = await User.findById(userID);

      if (!userID) {
        return res.status(400).json({ message: "UserID is required!" });
      }

      const settings = {
        fullName: user.fullName,
        hasCar: user.hasCar,
        language: user.language,
        currency: user.currency,
        rememberPriceFuel: user.rememberPriceFuel,
        predictMileage: user.predictMileage,
        darkTheme: user.darkTheme,
      };

      return res.status(200).json(settings);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  // async updateSettings(req, res) {
  //   try {
  //     const { email, password, fullName } = req.body;
  //     const candidate = await User.findOne({ email });

  //     if (candidate) {
  //       res.status(409).json({ message: "The email already registered!" });
  //     } else {
  //       const newUser = new User({
  //         email,
  //         password: bcryptjs.hashSync(password, 8),
  //         fullName,
  //       });

  //       await newUser.save();
  //       res.status(201).json(newUser);
  //     }
  //   } catch (error) {
  //     res.status(400).json({ message: "Registration error" });
  //   }
  // }
}

export default new SettingsController();
