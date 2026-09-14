import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import BloodInventory from "@/models/BloodInventory";

const groups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "O+",
  "O-",
  "AB+",
  "AB-",
];

export async function GET() {
  try {
    console.log("Inventory API called");

    await connectDB();

    console.log("Database connected");

    for (const bloodGroup of groups) {
      await BloodInventory.findOneAndUpdate(
        { bloodGroup },
        {
          $setOnInsert: {
            bloodGroup,
            units: 0,
            minimumLevel: 5,
          },
        },
        {
          upsert: true,
          new: true,
        }
      );
    }

    const inventory = await BloodInventory.find()
      .sort({ bloodGroup: 1 })
      .lean();

    console.log("Inventory loaded:", inventory.length);

    return NextResponse.json(inventory);

  } catch (error) {
    console.error("Inventory API Error:", error);

    return NextResponse.json(
      {
        error: "Failed to load inventory",
        details: error.message,
      },
      { status: 500 }
    );
  }
}