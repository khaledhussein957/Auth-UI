import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

const connectDB = async () => {
  if (cached.conn) {
    console.log("MongoDB already connected ✅");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Connecting to MongoDB... ⏳");

    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false, // Prevent buffering
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
    });
  }

  cached.conn = await cached.promise;

  console.log("MongoDB connected successfully ✅");

  return cached.conn;
};

export default connectDB;
