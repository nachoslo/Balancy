import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB); //si no hay db, cuando creemos algo se crea automaticamente
    console.log(">>> DB is connected");
  } catch (err) {
    console.log(err);
  }
};
