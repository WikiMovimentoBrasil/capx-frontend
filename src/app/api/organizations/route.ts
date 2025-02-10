import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { handleApiError } from "@/lib/utils/handleApiError";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  try {
    const response = await axios.get(`${process.env.BASE_URL}/organizations/`, {
      headers: {
        Authorization: authHeader,
      },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    return handleApiError(error, "Organizations fetch");
  }
}
