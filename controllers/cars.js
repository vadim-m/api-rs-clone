import Car from "../models/Car.js";
import User from "../models/User.js";

class CarController {
  async createCar(req, res) {
    try {
      const userID = req.headers["user-id"];
      const user = await User.findById(userID);
      const newCar = new Car(req.body);
      user.carId = newCar;
      user.hasCar = true;
      await newCar.save();
      await user.save();
      res.status(201).json(user.carId);
    } catch (error) {
      res.status(500).json({ message: "Creating error" });
    }
  }

  async getOneCar(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "ID is required!" });
      }
      const car = await Car.findById(id);

      return res.status(200).json(car);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async updateCar(req, res) {
    try {
      const carObj = req.body;
      if (!carObj._id) {
        res.status(400).json({ message: "ID is required!" });
      }
      const updatedCar = await Car.findByIdAndUpdate(carObj._id, carObj, {
        new: true,
      });
      return res.status(200).json(updatedCar);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async deleteCar(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "ID is required!" });
      }
      const car = await Car.findByIdAndDelete(id);
      return res.status(200).json(car);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

export default new CarController();
