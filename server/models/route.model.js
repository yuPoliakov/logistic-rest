import mongoose from "mongoose";
import { nanoid } from 'nanoid';

const routeSchema = new mongoose.Schema({
  id: {type: String, unique: true, default: () => nanoid(7), },
  start: String,
  destination: String,
  distance: Number,
  departureDate: String,
  arrivalDate: String,
  requiredType: String,
  expectedRevenue: Number,
  truckId: String,
  status: {type: String, enum: ['waiting', 'in-progress', 'done']}
});

routeSchema.virtual('truck', {
  ref: 'Truck',
  localField: 'truckId',
  foreignField: 'id',
  justOne: true
});

routeSchema.set('toObject', { virtuals: true });
routeSchema.set('toJSON', { virtuals: true });

export default mongoose.model("Route", routeSchema, "route");
