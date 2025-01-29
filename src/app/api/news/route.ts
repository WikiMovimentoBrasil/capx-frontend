import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  try {
    const response = await axios.get(`${process.env.BASE_URL}/tag_diff/`, {
      headers: {
        Authorization: authHeader,
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
      { error: "Failed to fetch news" },
      { status: error.response?.status || 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const body = await request.json();

  try {
    const response = await axios.post(
      `${process.env.BASE_URL}/tag_diff/`,
      body,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error details:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    );
  }
}
