import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// returns all skills
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  try {
    const response = await axios.get(`${process.env.BASE_URL}/skill`, {
      headers: {
        Authorization: authHeader,
      },
    });

    if (response.data.results) {
      return NextResponse.json(response.data.results);
    } else {
      return NextResponse.json(
        { error: "Failed to fetch skills" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}
