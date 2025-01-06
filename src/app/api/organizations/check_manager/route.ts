import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/organizations/check_manager/`,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to check manager status" },
      { status: error.response?.status || 500 }
    );
  }
}
