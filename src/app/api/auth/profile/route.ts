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
      `${process.env.BASE_URL}/users?username=${userId}`,
      {
        headers: {
          Authorization: request.headers.get("authorization"),
        },
      }
    );

    if (response.data.length > 0) {
      return NextResponse.json(response.data[0]);
    }
    return NextResponse.json(null);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const userId = data.user.id;

    const response = await axios.put(
      `${process.env.BASE_URL}/profile/${userId}/`,
      data,
      {
        headers: {
          Authorization: request.headers.get("authorization"),
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const response = await axios.options(
      `${process.env.BASE_URL}/profile/${userId}`,
      {
        headers: {
          Authorization: request.headers.get("authorization"),
        },
      }
    );

    const { user, ...formFields } = response.data.actions.PUT;
    return NextResponse.json(formFields);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch profile options" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const response = await axios.delete(
      `${process.env.BASE_URL}/profile/${data.userId}`,
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
