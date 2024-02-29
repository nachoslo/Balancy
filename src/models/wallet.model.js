import mongoose, { SchemaTypes } from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    wallet: {
      type: String,
      required: true,
    },
    cuil: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
    },
    cbu: {
      type: String,
      required: true,
    },
    balance: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      //FK del user al que le pertenece la wallet
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Wallet", walletSchema);
