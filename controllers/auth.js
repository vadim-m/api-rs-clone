import bcryptjs from "bcryptjs";
import User from "../models/User.js";

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        const isValidPass = bcryptjs.compareSync(password, candidate.password);

        if (isValidPass) {
          res.status(200).json({ message: "Parols equals!" });
        } else {
          res.status(401).json({ message: "Invalid password!" });
        }
      } else {
        res.status(404).json({ message: "The email not found!" });
      }
    } catch (error) {
      res.status(400).json({ message: "Login error" });
    }
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
