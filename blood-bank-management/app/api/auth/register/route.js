import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();
    const {name,email,password}=await req.json();
    if(!name || !email || !password) return NextResponse.json({error:"All fields are required"},{status:400});
    if(password.length<6) return NextResponse.json({error:"Password must be at least 6 characters"},{status:400});
    const exists=await User.findOne({email});
    if(exists) return NextResponse.json({error:"Email already registered"},{status:409});
    const hash=await bcrypt.hash(password,10);
    const user=await User.create({name,email,password:hash});
    return NextResponse.json({user:{id:user._id,name:user.name,email:user.email}},{status:201});
  } catch(e) {
    return NextResponse.json({error:"Registration failed"},{status:400});
  }
}
