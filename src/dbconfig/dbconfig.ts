import mongoose from "mongoose";

export async function connect() {
  if (mongoose.connection.readyState >= 1) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(" MongoDB connection failed:", error);
    throw new Error("MongoDB connection failed");
  }
}
