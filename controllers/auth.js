import bcryptjs from "bcryptjs";
import User from "../models/User.js";

class AuthController {
  login(req, res) {
    res.status(200).json({ mess: "HI from login" });
  }

  async register(req, res) {
    try {
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        res.status(409).json({ message: "The email already registered!" });
      } else {
        const newUser = new User({
          email,
          password: bcryptjs.hashSync(password, 8),
        });

        await newUser.save();
        res.status(201).json(newUser);
      }
    } catch (error) {
      res.status(400).json({ message: "Registration error" });
    }
  }
}

export default new AuthController();
