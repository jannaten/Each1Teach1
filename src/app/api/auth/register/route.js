import { NextResponse, NextRequest } from "next/server";
import { dbConnect } from "@/utilities/dbConnect";
import { userValidationSchema } from "@/validation";
import User from "@/models/user";
import bcrypt from "bcrypt";
import * as jose from "jose";

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
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const token = await new jose.SignJWT({
      id: user.id,
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer("each1teach1")
      .setAudience("students-teachers")
      .setExpirationTime("10h")
      .sign(secret);
    return NextResponse.json({ token }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
