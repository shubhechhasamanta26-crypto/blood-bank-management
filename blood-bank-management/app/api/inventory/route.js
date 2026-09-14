import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import BloodInventory from "@/models/BloodInventory";

const groups=["A+","A-","B+","B-","O+","O-","AB+","AB-"];

export async function GET(req) {
  try {
    await connectDB();
    const group=new URL(req.url).searchParams.get("group");
    if(group) {
      let item=await BloodInventory.findOne({bloodGroup:group}).lean();
      if(!item) item={bloodGroup:group,units:0,minimumLevel:5};
      return NextResponse.json(item);
    }
    let items=await BloodInventory.find().sort({bloodGroup:1}).lean();
    if(items.length<8) {
      for(const g of groups) {
        if(!items.some(x=>x.bloodGroup===g)) {
          const created=await BloodInventory.create({bloodGroup:g,units:0,minimumLevel:5});
          items.push(created.toObject());
        }
      }
    }
    items.sort((a,b)=>groups.indexOf(a.bloodGroup)-groups.indexOf(b.bloodGroup));
    return NextResponse.json(items);
  } catch(e) {
    return NextResponse.json({error:"Database connection failed. Check MONGODB_URI."},{status:500});
  }
}
