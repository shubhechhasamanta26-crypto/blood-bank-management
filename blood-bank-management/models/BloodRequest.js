import mongoose from "mongoose";

const BloodRequestSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true, trim: true },
    hospital: { type: String, required: true, trim: true },
    bloodGroup: { type: String, required: true, enum: ["A+","A-","B+","B-","O+","O-","AB+","AB-"] },
    units: { type: Number, required: true, min: 1 },
    contact: { type: String, required: true },
    urgency: { type: String, enum: ["Normal", "Urgent", "Emergency"], default: "Normal" },
    status: { type: String, enum: ["Pending", "Approved", "Rejected", "Fulfilled"], default: "Pending" }
  },
  { timestamps: true }
);

export default mongoose.models.BloodRequest || mongoose.model("BloodRequest", BloodRequestSchema);
