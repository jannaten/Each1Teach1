import { NextResponse } from "next/server";
import { dbConnect } from "@/utilities/dbConnect";
import { newsValidationSchema } from "@/validation";
import News from "@/models/news";

export async function GET(request, context) {
  try {
    const { params } = context;
    await dbConnect();
    const news = await News.findById({ _id: params._id })
      .populate("author", "firstName lastName")
      .sort({ createdAt: -1 });
    if (!news)
      return NextResponse.json(
        { message: "news does not exist" },
        { status: 404 }
      );
    return NextResponse.json(news);
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request, context) {
  try {
    await dbConnect();
    const { params } = context;

    const isNewsExist = await News.findById({ _id: params._id });
    if (!isNewsExist)
      return NextResponse.json(
        { message: "news does not exist" },
        { status: 404 }
      );
    const body = await request.json();
    const { value, error } = newsValidationSchema.validate(body);
    if (error)
      return NextResponse.json(
        { message: error.details[0].message },
        { status: 400 }
      );
    const updatedNews = await News.findByIdAndUpdate(params._id, value, {
      new: true,
    });
    if (!updatedNews)
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    return NextResponse.json(updatedNews);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    await dbConnect();
    const { params } = context;
    const deletedNews = await News.findByIdAndDelete(params._id);
    if (!deletedNews)
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    return NextResponse.json(deletedNews);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}