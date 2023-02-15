// import User from "../models/User.js";

class AuthController {
  login(req, res) {
    res.status(200).json({ mess: "HI from login" });
  }

  register(req, res) {
    res.status(200).json({ mess: "HI from register" });
  }
}

export default new AuthController();
