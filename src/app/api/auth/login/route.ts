import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Request with no body starts login process
    if (Object.keys(body).length === 0) {
      const startLoginResponse = await axios.post(
        process.env.LOGIN_STEP01_URL!
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
        { error: "Login initialization failed" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Login process failed" },
      { status: 500 }
    );
  }
}
