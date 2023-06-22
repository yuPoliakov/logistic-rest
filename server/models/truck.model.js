import mongoose from "mongoose";
import { nanoid } from 'nanoid';

const truckSchema = new mongoose.Schema({
  id: {type: String, unique: true, default: () => nanoid(7), },
  numberPlate: String,
  status: {type: String, enum: ['free', 'busy']},
  model: String,
  boughtDate: String,
  mileage: Number,
  type: {type: String, enum: ['heavy', 'medium', 'light']},
});

export default mongoose.model("Truck", truckSchema, "truck");
