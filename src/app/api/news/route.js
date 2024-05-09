import { NextResponse } from "next/server";
import { dbConnect } from "@/utilities/dbConnect";
import { newsValidationSchema } from "@/validation";
import News from "@/models/news";

export async function GET() {
  try {
    await dbConnect();
    const news = await News.find().populate('author', 'firstName lastName').sort({ createdAt: -1 });
    return NextResponse.json(news)
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { value, error } = newsValidationSchema.validate(body);
    if (error)
      return NextResponse.json(
        { message: error.details[0].message },
        { status: 400 }
      );
    const news = await News.create(value);
    return NextResponse.json(news);
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
