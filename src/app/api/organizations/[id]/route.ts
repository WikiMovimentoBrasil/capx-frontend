import { NextResponse } from "next/server";
import axios from "axios";
import { handleApiError } from "@/lib/utils/handleApiError";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const authHeader = request.headers.get("authorization");

  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/organizations/${params.id}/`,
      {
        headers: {
          Authorization: authHeader,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return handleApiError(error, "Organization fetch");
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get("authorization");

    const updateResponse = await axios.put(
      `${process.env.BASE_URL}/organizations/${params.id}/`,
      body,
      {
        headers: {
          Authorization: authHeader,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(updateResponse.data);
  } catch (error: any) {
    return handleApiError(error, "Organization update");
  }
}
