import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("MongoDB already connected ✅");
    return mongoose;
  }

  console.log("Connecting to MongoDB... ⏳");

  const conn = await mongoose.connect(MONGO_URI, {
    bufferCommands: false, // Prevent buffering
    serverSelectionTimeoutMS: 10000, // 10 seconds timeout
    family: 4, // Use IPv4, skip trying IPv6
  });

  console.log("MongoDB connected successfully ✅");

  return conn;
};

export default connectDB;
