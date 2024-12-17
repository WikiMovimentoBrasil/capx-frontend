import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));

    console.log("body", body);
    // Request with no body
    if (!body || Object.keys(body).length === 0) {
      const startLoginResponse = await axios.post(
        process.env.LOGIN_STEP01_URL as string,
        { extra: request.headers.get('host') }
      );

      if (startLoginResponse.data.oauth_callback_confirmed) {
        const { oauth_token, oauth_token_secret } = startLoginResponse.data;
        const redirectURL = process.env.LOGIN_STEP02_URL;
        const redirectURLParams = `?oauth_token=${oauth_token}&oauth_token_secret=${oauth_token_secret}`;

        return NextResponse.json({
          oauth_token,
          oauth_token_secret,
          redirect_url: redirectURL + redirectURLParams,
        });
      }

      return NextResponse.json(
        { error: "OAuth callback not confirmed" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
