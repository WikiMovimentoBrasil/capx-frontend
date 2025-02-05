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

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const event = await request.json();
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}/events/`,
      event,
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Event creation error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      event: event,
      headers: {
        Authorization: authHeader ? "Present" : "Missing",
      },
    });
    return NextResponse.json(
      {
        error: "Failed to create event",
        details: error.response?.data || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}
