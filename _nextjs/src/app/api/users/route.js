import { NextResponse } from "next/server";
import { dbConnect } from "@/utilities/dbConnect";
import { userValidationSchema } from "@/validation";
import User from "@/models/user";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { value, error } = userValidationSchema.validate(body);
    if (error)
      return NextResponse.json(
        { message: error.details[0].message },
        { status: 400 }
      );
    const isUserExist = await User.findOne({ email: value.email });
    if (isUserExist)
      return NextResponse.json(
        { message: "user already exist" },
        { status: 400 }
      );
    const hashedPassword = await bcrypt.hash(value.password, 12);
    const user = await User.create({
      ...value,
      password: hashedPassword,
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
