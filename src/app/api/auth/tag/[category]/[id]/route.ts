import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import axios from "axios";

export async function GET(
  request: Request,
  { params }: { params: { category: string; id: string } }
) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Requesting list of tag codes
    const codeList = await axios.get(
      `${process.env.BASE_URL}/list_${params.category}`,
      {
        headers: {
          Authorization: request.headers.get("authorization"),
        },
      }
    );

    if (!codeList.data.hasOwnProperty(params.id)) {
      return NextResponse.json(
        { error: "No item for this tag id." },
        { status: 500 }
      );
    }

    // Requesting list of users who have the tag
    const userList = await axios.get(
      `${process.env.BASE_URL}/tags/${params.category}/${params.id}`,
      {
        headers: {
          Authorization: request.headers.get("authorization"),
        },
      }
    );

    const tagData = {
      code: params.id,
      name: codeList.data[params.id],
      users: userList.data,
    };

    return NextResponse.json(tagData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tag data" },
      { status: 500 }
    );
  }
}
