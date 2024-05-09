import { NextResponse } from "next/server";
import { dbConnect } from "@/utilities/dbConnect";

import User from "@/models/user";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { tokenValidationSchema } from "@/validation";

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { value, error } = tokenValidationSchema.validate(body);
    if (error)
      return NextResponse.json(
        { message: error.details[0].message },
        { status: 400 }
      );
    const user = await User.findOne({ email: value.email });
    if (!user)
      return NextResponse.json(
        { message: "user does not exist" },
        { status: 404 }
      );
    const isPasswordCorrect = await bcrypt.compare(
      value.password,
      user.password
    );
    if (!isPasswordCorrect)
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    // const token = jwt.sign(
    //   {
    //     id: user.id,
    //     email: user.email,
    //     role: user.role
    //   },
    //   process.env.JWT_SECRET_KEY,
    //   {
    //     expiresIn: '10h',
    //   }
    // );
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

    return NextResponse.json({ token });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
