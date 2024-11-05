import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import axios from "axios";

export async function GET(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const response = await axios.get(
      `${process.env.BASE_URL}/users/${userId}`,
      {
        headers: {
          Authorization: request.headers.get("authorization"),
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
