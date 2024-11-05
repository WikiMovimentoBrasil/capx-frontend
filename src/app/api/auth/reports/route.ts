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
    const reportId = searchParams.get("reportId");
    const reqUrl = reportId ? `/bugs/${reportId}` : "/bugs";

    const response = await axios.get(`${process.env.BASE_URL}${reqUrl}`, {
      headers: {
        Authorization: request.headers.get("authorization"),
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch reports" },
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
    const reportId = data.report;

    const response = await axios.put(
      `${process.env.BASE_URL}/bugs/${reportId}/`,
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
      { error: "Failed to update report" },
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
    const reportId = searchParams.get("reportId");

    const response = await axios.options(
      `${process.env.BASE_URL}/bugs/${reportId}`,
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
      { error: "Failed to fetch report options" },
      { status: 500 }
    );
  }
}
