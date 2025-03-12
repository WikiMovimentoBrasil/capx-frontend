import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const authHeader = request.headers.get("authorization");
  const search = searchParams.get("search");
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset");

  try {
    const queryResponse = await axios.get(`${process.env.BASE_URL}/users/`, {
      headers: {
        Authorization: authHeader,
      },
      params: {
        search,
        limit,
        offset,
      },
    });

    return NextResponse.json(queryResponse.data.results);
  } catch (error) {
    console.error("Failed to fetch user by id", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
