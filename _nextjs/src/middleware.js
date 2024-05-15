import { NextResponse } from "next/server";
import * as jose from "jose";

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET_KEY),
};

export const config = {
  matcher: ["/api/:function*"],
};

export async function middleware(request) {
  const expectedApiKey = process.env.API_KEY;
  const apiKey = request.headers.get("x-api-key");
  if (!apiKey)
    return NextResponse.json(
      { message: "Unauthorized: Missing API key" },
      { status: 401 }
    );

  if (apiKey !== expectedApiKey)
    return NextResponse.json(
      { message: "Forbidden: Invalid API key" },
      { status: 403 }
    );

  if (
    (request.method === "GET" ||
      request.method === "DELETE" ||
      request.method === "POST") &&
    request.nextUrl.pathname.startsWith("/api/users")
  ) {
    const token = request.headers.get("x-auth-token");
    if (!token)
      return NextResponse.json(
        { message: "ACCESS DENIED: No token provided" },
        { status: 401 }
      );
    try {
      const { payload } = await jose.jwtVerify(token, jwtConfig.secret);
      if (payload.role !== "admin")
        return NextResponse.json(
          { message: `UNAUTHORIZED - ${payload.role} is not allowed` },
          { status: 403 }
        );
    } catch (error) {
      return NextResponse.json({ message: "INVALID token" }, { status: 400 });
    }
  }

  if (
    (request.method === "PUT" ||
      request.method === "DELETE" ||
      request.method === "POST") &&
    request.nextUrl.pathname.startsWith("/api/news")
  ) {
    const token = request.headers.get("x-auth-token");
    if (!token)
      return NextResponse.json(
        { message: "ACCESS DENIED: No token provided" },
        { status: 401 }
      );
    try {
      const { payload } = await jose.jwtVerify(token, jwtConfig.secret);
      const body = await request.json();
      if (payload.role !== "admin" && payload.role !== "teacher")
        return NextResponse.json(
          { message: `UNAUTHORIZED - ${payload.role} is not allowed` },
          { status: 403 }
        );
      if(payload.id !== body.author && payload.role !== "admin") {
        return NextResponse.json(
          { message: `UNAUTHORIZED - Wrong user operation` },
          { status: 403 }
        );
      }
    } catch (error) {
      return NextResponse.json({ message: "INVALID token" }, { status: 400 });
    }
  }
  return NextResponse.next();
}
