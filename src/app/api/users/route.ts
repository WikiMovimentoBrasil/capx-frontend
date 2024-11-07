import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  const authHeader = request.headers.get("authorization");

  try {
    const queryResponse = await axios.get(
      `${process.env.BASE_URL}/users/${userId}`,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    return NextResponse.json(queryResponse.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
