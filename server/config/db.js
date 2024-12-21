import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected: " + connection.connection.host);
  } catch (error) {
    console.error("Couldn't connect to MongoDB. Error: " + error.message);
    process.exit(1); // 1 code means exit with failure, 0 means success
  }
};