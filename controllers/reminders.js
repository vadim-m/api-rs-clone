import User from "../models/User.js";
import Reminder from "../models/Reminder.js";

class RemindersController {
  async createReminders(req, res) {
    try {
      const userID = req.headers["user-id"];
      const user = await User.findById(userID);
      const newTodo = new Reminder(req.body);

      user.todos.push(newTodo);

      await newTodo.save();
      await user.save();
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ message: "Creating error" });
    }
  }

  async getReminders(req, res) {
    try {
      const userID = req.headers["user-id"];
      const user = await User.findById(userID).populate("reminders");

      if (!userID) {
        return res.status(400).json({ message: "UserID is required!" });
      }

      const todos = user.todos;
      return res.status(200).json(todos);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async updateReminders(req, res) {
    try {
      const todoObj = req.body;
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "ID is required!" });
      }

      const updatedTodo = await Reminder.findByIdAndUpdate(id, todoObj, {
        new: true,
      });

      return res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async deleteReminders(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "ID is required!" });
      }

      const deletedTodo = await Reminder.findByIdAndDelete(id);

      return res.status(200).json(deletedTodo);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

export default new RemindersController();
