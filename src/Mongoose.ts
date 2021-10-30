import mongoose from "mongoose";

import Simulation from "./Simulation";

export default class Mongoose {
  public static async connect() {
    try {
      await mongoose.connect(`mongodb://root:${process.env.MONGO_ROOT_PASS}@127.0.0.1:27017/telemetry?authSource=admin`);
      console.log("Connected to MongoDB");
      Simulation.start();
    } catch (error) {
      throw error;
    }
  }
}