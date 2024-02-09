import { NextResponse, NextRequest } from "next/server";
import { dbConnect } from "@/utilities/dbConnect";
import User from "@/models/user";

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const newUser = new User(body);
    await newUser.save();
    return NextResponse.json({ message: "POST request received!" });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
