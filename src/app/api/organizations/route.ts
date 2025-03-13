import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const searchParams = request.nextUrl.searchParams;
  const offset = searchParams.get("offset");
  const limit = searchParams.get("limit");
  try {
    const response = await axios.get(`${process.env.BASE_URL}/organizations/`, {
      headers: {
        Authorization: authHeader,
      },
      params: {
        limit,
        offset,
      },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error details:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return NextResponse.json(
      { error: "Failed to fetch organizations" },
      { status: error.response?.status || 500 }
    );
  }
}
