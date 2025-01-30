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

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const tagData = await request.json();
    console.log("API Route - Creating tag_diff with:", tagData);

    const response = await axios.post(
      `${process.env.BASE_URL}/tag_diff/`,
      tagData,
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API Route - Backend response:", response.data);

    if (!response.data) {
      throw new Error("Empty response from backend");
    }

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("API Route - Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    return NextResponse.json(
      {
        error: "Failed to create tag_diff",
        details: error.response?.data || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}
