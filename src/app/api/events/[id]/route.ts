import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authHeader = request.headers.get("authorization");
  const id = params.id;

  try {
    const response = await axios.get(`${process.env.BASE_URL}/events/${id}/`, {
      headers: {
        Authorization: authHeader,
      },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Event fetch error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: `${process.env.BASE_URL}/events/${id}`,
      headers: {
        Authorization: authHeader ? "Present" : "Missing",
      },
    });

    return NextResponse.json(
      {
        error: "Failed to fetch event with id " + id,
        details: error.response?.data || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}
