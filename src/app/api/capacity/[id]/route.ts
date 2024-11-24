import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id ?? "";
    const language = req.nextUrl.searchParams.get("language") ?? "en";
    const authHeader = req.headers.get("authorization");

    // Get capacity codes
    const codesResponse = await axios.get(
      `${process.env.BASE_URL}/list/skills/`,
      {
        headers: { Authorization: authHeader ?? "" },
      }
    );

    if (!codesResponse.data[id]) {
      return NextResponse.json(
        { error: "No wikidata item for this capacity id." },
        { status: 404 }
      );
    }

    // Get users with this capacity
    const usersResponse = await axios.get(
      `${process.env.BASE_URL}/users_by_skill/${id}/`,
      { headers: { Authorization: authHeader ?? "" } }
    );

    // Get Wikidata information
    const wdCode = codesResponse.data[id];
    const wikidataResponse = await axios.get(
      `https://query.wikidata.org/bigdata/namespace/wdq/sparql`,
      {
        params: {
          format: "json",
          query: `SELECT ?item ?itemLabel ?itemDescription WHERE {
            VALUES ?item { wd:${wdCode} }
            SERVICE wikibase:label { bd:serviceParam wikibase:language "${language},en". }
          }`,
        },
      }
    );

    const response = {
      code: id,
      wd_code: wdCode,
      name: wikidataResponse.data.results.bindings[0].itemLabel.value,
      description:
        wikidataResponse.data.results.bindings[0].itemDescription?.value,
      users: usersResponse.data,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in capacity route:", error);
    return NextResponse.json(
      { error: "Failed to fetch capacity data" },
      { status: 500 }
    );
  }
}
