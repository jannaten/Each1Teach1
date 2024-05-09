import { NextResponse, NextRequest } from "next/server";
import { dbConnect } from "@/utilities/dbConnect";
import User from "@/models/user";

export async function GET(request, context) {
  try {
    await dbConnect();
    const { params } = context;
    const user = await User.findById({ _id: params._id });
    if (!user)
      return NextResponse.json(
        { message: "user does not exist" },
        { status: 404 }
      );
    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    await dbConnect();
    const { params } = context;
    const deletedUser = await User.findByIdAndDelete(params._id);
    if (!deletedUser)
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    return NextResponse.json(deletedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
