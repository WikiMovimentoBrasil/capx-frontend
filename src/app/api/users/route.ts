import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const authHeader = request.headers.get("authorization");
  const search = searchParams.get("search");
  const offset = searchParams.get("offset");
  const limit = searchParams.get("limit");

  try {
    const queryResponse = await axios.get(
      `${process.env.BASE_URL}/users/`,
      {
        headers: {
          Authorization: authHeader,
        },
        params: {
          limit,
          offset,
          search,
        },
      }
    );
    return NextResponse.json(queryResponse.data);
  } catch (error) {
    console.error("Failed to fetch user by id", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
