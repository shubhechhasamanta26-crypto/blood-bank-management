import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Donor from "@/models/Donor";

export async function GET() {
  try {
    await connectDB();
    const donors = await Donor.find().sort({createdAt:-1}).lean();
    return NextResponse.json(donors);
  } catch (e) {
    return NextResponse.json({error:"Database connection failed. Check MONGODB_URI."},{status:500});
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const donor = await Donor.create(body);
    return NextResponse.json({donor},{status:201});
  } catch (e) {
    return NextResponse.json({error:e.message || "Could not register donor"},{status:400});
  }
}
