import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// returns all skills
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  // Get limit and offset from URL parameters
  const searchParams = request.nextUrl.searchParams;
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset");

  // Construct URL with query parameters if they exist
  let url = `${process.env.BASE_URL}/skill`;
  const params = new URLSearchParams();

  if (limit) params.append("limit", limit);
  if (offset) params.append("offset", offset);

  // Add parameters to URL if any exist
  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  try {
    const response = await axios.get(url, {
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
