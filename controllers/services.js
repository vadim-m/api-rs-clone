import User from "../models/User.js";
import Service from "../models/Service.js";

class ServicesController {
  async createServices(req, res) {
    try {
      const userID = req.headers["user-id"];
      const user = await User.findById(userID);
      const newTodo = new Service(req.body);

      user.todos.push(newTodo);

      await newTodo.save();
      await user.save();
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ message: "Creating error" });
    }
  }

  async getServices(req, res) {
    try {
      const userID = req.headers["user-id"];
      const user = await User.findById(userID).populate("services");

      if (!userID) {
        return res.status(400).json({ message: "UserID is required!" });
      }

      const todos = user.todos;
      return res.status(200).json(todos);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async updateServices(req, res) {
    try {
      const todoObj = req.body;
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "ID is required!" });
      }

      const updatedTodo = await Service.findByIdAndUpdate(id, todoObj, {
        new: true,
      });

      return res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async deleteServices(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "ID is required!" });
      }

      const deletedTodo = await Service.findByIdAndDelete(id);

      return res.status(200).json(deletedTodo);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

export default new ServicesController();
