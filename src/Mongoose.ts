import mongoose from "mongoose";

import Simulation from "./Simulation";

export default class Mongoose {
  public static async connect() {
    try {
      console.log('Connecting to' + `mongodb://root:${process.env.MONGO_ROOT_PASS}@mongodb:27017/telemetry?authSource=admin`);
      await mongoose.connect(`mongodb://root:${process.env.MONGO_ROOT_PASS}@mongodb:27017/telemetry?authSource=admin`);
      console.log("Connected to MongoDB");
      Simulation.start();
    } catch (error) {
      throw error;
    }
  }
}