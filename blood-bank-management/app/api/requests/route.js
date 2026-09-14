import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import BloodRequest from "@/models/BloodRequest";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json(await BloodRequest.find().sort({createdAt:-1}).lean());
  } catch(e) {
    return NextResponse.json({error:"Database connection failed."},{status:500});
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const request = await BloodRequest.create(body);
    return NextResponse.json({request},{status:201});
  } catch(e) {
    return NextResponse.json({error:e.message || "Could not create request"},{status:400});
  }
}
