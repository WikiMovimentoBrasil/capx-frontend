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
    const category = searchParams.get("category");
    const tagId = searchParams.get("tagId");

    // Requesting list of tag codes
    const codeList = await axios.get(
      `${process.env.BASE_URL}/list_${category}`,
      {
        headers: {
          Authorization: request.headers.get("authorization"),
        },
      }
    );

    if (!codeList.data.hasOwnProperty(tagId)) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }

    // Requesting list of users who have the tag
    const userList = await axios.get(
      `${process.env.BASE_URL}/tags/${category}/${tagId}`,
      {
        headers: {
          Authorization: request.headers.get("authorization"),
        },
      }
    );

    const tagData = {
      code: tagId,
      // TODO: Fix this typo assumption
      name: codeList.data[tagId as keyof typeof codeList.data] as string,
      users: userList.data,
    };

    return NextResponse.json(tagData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tag" }, { status: 500 });
  }
}
