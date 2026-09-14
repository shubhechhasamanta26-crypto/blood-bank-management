import mongoose from "mongoose";

const DonorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 18, max: 65 },
    gender: { type: String, required: true },
    bloodGroup: { type: String, required: true, enum: ["A+","A-","B+","B-","O+","O-","AB+","AB-"] },
    phone: { type: String, required: true },
    email: { type: String, lowercase: true, trim: true },
    city: { type: String, required: true },
    lastDonation: { type: Date, default: null },
    available: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.models.Donor || mongoose.model("Donor", DonorSchema);
