import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/lib/utils/handleApiError";
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authHeader = request.headers.get("authorization");
  const formData = await request.json();

  try {
    const payload = {
      ...formData,
      user: {
        id: Number(params.id),
      },
    };

    const response = await axios.put(
      `${process.env.BASE_URL}/profile/${params.id}/`,
      payload,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return handleApiError(error, "Profile update");
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authHeader = request.headers.get("authorization");

  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/profile/${params.id}/`,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return handleApiError(error, "Profile fetch");
  }
}
