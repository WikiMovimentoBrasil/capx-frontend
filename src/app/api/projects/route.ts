import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  try {
    const response = await axios.get(`${process.env.BASE_URL}/projects`, {
      headers: {
        Authorization: authHeader,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const body = await request.json();
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}/projects/`,
      body,
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.data || !response.data.id) {
      throw new Error("Invalid response from server: missing project data");
    }
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Project creation error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      body: body,
      headers: {
        Authorization: authHeader ? "Present" : "Missing",
      },
    });
    return NextResponse.json(
      {
        details: error.response?.data || error.message,
        status: error.response?.status || 500,
      },
      { status: error.response?.status || 500 }
    );
  }
}
