import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const authHeader = request.headers.get("authorization");

  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/organizations/${params.id}/`,
      {
        headers: {
          Authorization: authHeader,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to fetch organization",
        details: error.response?.data || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("PUT request received for organization:", params.id);
  try {
    const body = await request.json();
    const authHeader = request.headers.get("authorization");

    console.log("Request body:", body);

    // Log da requisição PUT
    const updateResponse = await axios.put(
      `${process.env.BASE_URL}/organizations/${params.id}/`,
      body,
      {
        headers: {
          Authorization: authHeader,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("PUT response:", updateResponse.data);

    // Retornar diretamente a resposta do PUT para verificar se os eventos estão sendo atualizados
    return NextResponse.json(updateResponse.data);

    /* Comentando o GET por enquanto para debug
    await new Promise(resolve => setTimeout(resolve, 1000));

    const getResponse = await axios.get(
      `${process.env.BASE_URL}/organizations/${params.id}/`,
      {
        headers: {
          Authorization: authHeader,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("GET response after update:", getResponse.data);
    return NextResponse.json(getResponse.data);
    */
  } catch (error: any) {
    console.error("Error details:", error.response?.data || error);
    return NextResponse.json(
      {
        error: "Failed to update organization",
        details: error.response?.data || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}
