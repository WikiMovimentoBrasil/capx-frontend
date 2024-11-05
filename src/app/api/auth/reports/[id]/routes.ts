import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import axios from "axios";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/users?username=${params.id}`,
      {
        headers: {
          Authorization: request.headers.get("authorization"),
        },
      }
    );

    if (response.data.length > 0) {
      return NextResponse.json(response.data[0]);
    }

    return NextResponse.json(null, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await axios.delete(
      `${process.env.BASE_URL}/profile/${params.id}`,
      {
        headers: {
          Authorization: request.headers.get("authorization"),
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete profile" },
      { status: 500 }
    );
  }
}
