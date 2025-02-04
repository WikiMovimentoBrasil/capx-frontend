import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  try {
    // Pega o token do header Authorization
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "No authorization token provided" },
        { status: 401 }
      );
    }

    // Mudando para usar a rota correta do backend
    const response = await axios.get(`${process.env.BASE_URL}/avatar/`, {
      headers: {
        Authorization: authHeader,
      },
    });

    if (!response.data) {
      throw new Error("No data received from backend");
    }

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Avatar fetch error:", {
      url: `${process.env.BASE_URL}/avatar/`,
      error: error.response?.data || error.message,
      status: error.response?.status,
    });
    return NextResponse.json(
      { error: "Failed to fetch avatars" },
      { status: error.response?.status || 500 }
    );
  }
}
