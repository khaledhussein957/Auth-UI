import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(MONGO_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to database");
    process.exit(1); // Exit process with failure 0 is success, 1 is failure
  }
};

export default connectDB;
