import { NextResponse } from "next/server";

export function handleApiError(error: any, routeName: string) {
  if (
    error.response?.status === 401 &&
    error.response?.data?.detail === "Invalid token."
  ) {
    return NextResponse.json(
      { error: "Invalid token", shouldLogout: true },
      { status: 401 }
    );
  }

  console.error(`${routeName} error:`, {
    error: error.response?.data || error.message,
    status: error.response?.status,
  });

  return NextResponse.json(
    { error: `Failed to process ${routeName} request` },
    { status: error.response?.status || 500 }
  );
}
