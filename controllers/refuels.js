import User from "../models/User.js";
import Refuel from "../models/Refuel.js";

class RefuelsController {
  async createRefuels(req, res) {
    try {
      const userID = req.headers["user-id"];
      const user = await User.findById(userID);
      const newTodo = new Refuel(req.body);

      user.todos.push(newTodo);

      await newTodo.save();
      await user.save();
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ message: "Creating error" });
    }
  }

  async getRefuels(req, res) {
    try {
      const userID = req.headers["user-id"];
      const user = await User.findById(userID).populate("refuels");

      if (!userID) {
        return res.status(400).json({ message: "UserID is required!" });
      }

      const todos = user.todos;
      return res.status(200).json(todos);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async updateRefuels(req, res) {
    try {
      const todoObj = req.body;
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "ID is required!" });
      }

      const updatedTodo = await Refuel.findByIdAndUpdate(id, todoObj, {
        new: true,
      });

      return res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async deleteRefuels(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "ID is required!" });
      }

      const deletedTodo = await Refuel.findByIdAndDelete(id);

      return res.status(200).json(deletedTodo);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

export default new RefuelsController();
