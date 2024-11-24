import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  if (request.method === "GET") {
    try {
      const capacityId = params.id;
      const response = await axios.get(
        process.env.BASE_URL + "/skills_by_type/" + capacityId + "/",
        {
          headers: {
            Authorization: request.headers.get("authorization") ?? "",
          },
        }
      );
      return NextResponse.json(response.data);
    } catch (error) {
      return NextResponse.json({ error: "Failed to fetch data." });
    }
  } else {
    return NextResponse.json({ error: "Method not allowed." });
  }
}
