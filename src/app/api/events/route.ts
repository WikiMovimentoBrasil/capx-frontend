import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  try {
    const response = await axios.get(`${process.env.BASE_URL}/events/`, {
      headers: {
        Authorization: authHeader,
      },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Events fetch error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    return NextResponse.json(
      {
        error: "Failed to fetch events",
        details: error.response?.data || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}
