import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get the category from searchParams
    const category = request.nextUrl.searchParams.get("category");
    const id = params.id;

    if (!category) {
      return NextResponse.json(
        { error: "Category parameter is required" },
        { status: 400 }
      );
    }

    // Get authorization header
    const authorization = request.headers.get("authorization");
    if (!authorization) {
      return NextResponse.json(
        { error: "Authorization header is required" },
        { status: 401 }
      );
    }

    // Requesting list of tag codes (based on chosen category)
    const codeList = await axios.get(
      `${process.env.BASE_URL}/list/${category}/`,
      {
        headers: {
          Authorization: authorization,
        },
      }
    );

    // Returning error if the requested id does not have a corresponding tag code
    if (!codeList.data.hasOwnProperty(id)) {
      return NextResponse.json(
        { error: "No item for this tag id." },
        { status: 404 }
      );
    }

    // Requesting list of users who have the tag in their profile
    const userList = await axios.get(
      `${process.env.BASE_URL}/tags/${category}/${id}/`,
      {
        headers: {
          Authorization: authorization,
        },
      }
    );

    const tagData = {
      code: id,
      name: codeList.data[id],
      users: userList.data,
    };

    return NextResponse.json(tagData);
  } catch (error) {
    console.error("Tag API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tag data" },
      { status: 500 }
    );
  }
}
