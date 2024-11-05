import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import axios from "axios";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get("language") || "en";

    // Fetch capacity details
    const capacityResponse = await axios.get(
      `${process.env.BASE_URL}/skills/${params.id}`,
      {
        headers: {
          Authorization: request.headers.get("authorization"),
        },
      }
    );

    // Fetch Wikidata label
    const wdCode = capacityResponse.data.wd_code;
    const queryText = `SELECT ?itemLabel WHERE {
      VALUES ?item { wd:${wdCode} }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "${language},en". }
    }`;

    const wikidataResponse = await axios.get(
      `https://query.wikidata.org/bigdata/namespace/wdq/sparql?format=json&query=${encodeURIComponent(
        queryText
      )}`
    );

    const capacityData = {
      ...capacityResponse.data,
      name: wikidataResponse.data.results.bindings[0]?.itemLabel.value,
    };

    return NextResponse.json(capacityData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch capacity" },
      { status: 500 }
    );
  }
}
