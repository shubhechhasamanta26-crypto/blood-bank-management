import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();
    const {email,password}=await req.json();
    const user=await User.findOne({email});
    if(!user || !(await bcrypt.compare(password,user.password))) {
      return NextResponse.json({error:"Invalid email or password"},{status:401});
    }
    return NextResponse.json({user:{id:user._id,name:user.name,email:user.email,role:user.role}});
  } catch(e) {
    return NextResponse.json({error:"Login failed"},{status:400});
  }
}
