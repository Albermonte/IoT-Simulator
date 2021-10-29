import mongoose from "mongoose";

export interface IBattery {
  tension: number;
  temp: number;
  charge: number;
}

export interface IBatteryModel extends IBattery, mongoose.Document { }

const batterySchema = new mongoose.Schema(
  {
    tension: { type: Number, required: true },
    temp: { type: Number, required: true },
    charge: { type: Number, required: true },
  },
  {
    versionKey: false,
  },
);

const Battery: mongoose.Model<IBatteryModel> = mongoose.model<IBatteryModel>(
  "Battery",
  batterySchema,
);
export default Battery;