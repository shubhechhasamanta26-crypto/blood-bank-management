import mongoose from "mongoose";

const BloodInventorySchema = new mongoose.Schema(
  {
    bloodGroup: { type: String, required: true, unique: true, enum: ["A+","A-","B+","B-","O+","O-","AB+","AB-"] },
    units: { type: Number, default: 0, min: 0 },
    minimumLevel: { type: Number, default: 5, min: 0 }
  },
  { timestamps: true }
);

export default mongoose.models.BloodInventory || mongoose.model("BloodInventory", BloodInventorySchema);
