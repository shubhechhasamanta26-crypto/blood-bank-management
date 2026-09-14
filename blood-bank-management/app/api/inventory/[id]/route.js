import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import BloodInventory from "@/models/BloodInventory";

export async function PUT(req,{params}) {
  try {
    await connectDB();
    const {units}=await req.json();
    const item=await BloodInventory.findByIdAndUpdate(params.id,{units:Number(units)},{new:true});
    if(!item) return NextResponse.json({error:"Inventory item not found"},{status:404});
    return NextResponse.json({item});
  } catch(e) {
    return NextResponse.json({error:"Could not update inventory"},{status:400});
  }
}
