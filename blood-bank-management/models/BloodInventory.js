import mongoose from "mongoose";

const BloodInventorySchema = new mongoose.Schema(
  {
    bloodGroup: {
      type: String,
      required: true,
      unique: true,
    },

    units: {
      type: Number,
      default: 0,
    },

    minimumLevel: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.BloodInventory ||
  mongoose.model("BloodInventory", BloodInventorySchema);
