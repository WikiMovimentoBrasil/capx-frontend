import { NextResponse } from "next/server";
import axios from "axios";

export async function POST() {
  try {
    if (!process.env.LOGIN_STEP01_URL) {
      throw new Error("LOGIN_STEP01_URL não está configurada");
    }

    const startLoginResponse = await axios.post(
      process.env.LOGIN_STEP01_URL,
      {
        oauth_callback: process.env.NEXTAUTH_URL + "/oauth",
        provider: "mediawiki",
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!startLoginResponse.data) {
      throw new Error("Resposta vazia do backend");
    }

    const { oauth_token, oauth_token_secret } = startLoginResponse.data;

    if (!oauth_token || !oauth_token_secret) {
      throw new Error("Tokens OAuth ausentes na resposta");
    }

    const redirectURL = process.env.LOGIN_STEP02_URL;
    if (!redirectURL) {
      throw new Error("LOGIN_STEP02_URL não está configurada");
    }

    const redirectURLParams = `?oauth_token=${oauth_token}`;
    const fullRedirectURL = redirectURL + redirectURLParams;

    return NextResponse.json({
      oauth_token,
      oauth_token_secret,
      redirect_url: fullRedirectURL,
    });
  } catch (error: any) {
    console.error("Detalhes do erro de login:", {
      mensagem: error.message,
      resposta: error.response?.data,
      status: error.response?.status,
    });

    return NextResponse.json(
      {
        error: "Falha ao iniciar processo de login",
        details: error.response?.data || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}
