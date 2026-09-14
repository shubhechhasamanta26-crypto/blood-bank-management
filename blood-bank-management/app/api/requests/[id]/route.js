import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import BloodRequest from "@/models/BloodRequest";

export async function PUT(req,{params}) {
  try {
    await connectDB();
    const body=await req.json();
    const request=await BloodRequest.findByIdAndUpdate(params.id,{$set:{status:body.status}},{new:true});
    if(!request) return NextResponse.json({error:"Request not found"},{status:404});
    return NextResponse.json({request});
  } catch(e) {
    return NextResponse.json({error:"Could not update request"},{status:400});
  }
}
