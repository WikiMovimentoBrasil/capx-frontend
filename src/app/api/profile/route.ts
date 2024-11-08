import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  const authHeader = request.headers.get("authorization");

  try {
    const response = await axios.get(
      process.env.BASE_URL + "/users?username=" + userId,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    if (response.data.length > 0) {
      return NextResponse.json(response.data[0]);
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const authHeader = request.headers.get("authorization");
  const userId = body.user.id;

  try {
    const response = await axios.put(
      process.env.BASE_URL + "/profile/" + userId + "/",
      body,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    if (response.status === 200) {
      return NextResponse.json(response.data);
    } else {
      return NextResponse.json(
        { error: "Failed to update user profile" },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user profile" },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  const authHeader = request.headers.get("authorization");

  try {
    const response = await axios.options(
      `${process.env.BASE_URL}/profile/${userId}`,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );
    // Removing "user" key/value
    const { user, ...formFields } = response.data.actions.PUT;

    return NextResponse.json(formFields);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch options" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const authHeader = request.headers.get("authorization");
  const userId = body.user.id;

  try {
    const response = await axios.delete(
      process.env.BASE_URL + "/profile/" + userId,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    if (response.status === 200) {
      return NextResponse.json(response.data);
    } else {
      return NextResponse.json(
        { error: "Failed to delete user profile" },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user profile" },
      { status: 500 }
    );
  }
}