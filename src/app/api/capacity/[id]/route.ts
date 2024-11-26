import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const language = req.nextUrl.searchParams.get("language");
    const authHeader = req.headers.get("authorization");

    const codeList = await axios.get(`${process.env.BASE_URL}/list/skills/`, {
      headers: { Authorization: authHeader },
    });

    if (!codeList.data.hasOwnProperty(id)) {
      return NextResponse.json(
        { error: "No wikidata item for this capacity id." },
        { status: 500 }
      );
    }

    const userList = await axios.get(
      `${process.env.BASE_URL}/users_by_skill/${id}/`,
      { headers: { Authorization: authHeader } }
    );

    const capacityCodes = {
      code: id,
      wd_code: codeList.data[id],
      users: userList.data,
    };

    const capWikidataCode = "wd:" + capacityCodes.wd_code;
    const queryText = `SELECT ?item ?itemLabel ?itemDescription WHERE {VALUES ?item {${capWikidataCode}} SERVICE wikibase:label { bd:serviceParam wikibase:language '${language},en'.}}`;

    const wikidataResponse = await axios.get(
      `https://query.wikidata.org/bigdata/namespace/wdq/sparql?format=json&query=${queryText}`
    );

    const capacityData = {
      name: wikidataResponse.data.results.bindings[0].itemLabel.value,
      description: wikidataResponse.data.results.bindings[0].itemDescription
        ? wikidataResponse.data.results.bindings[0].itemDescription.value
        : undefined,
    };

    return NextResponse.json({ ...capacityCodes, ...capacityData });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data." },
      { status: 500 }
    );
  }
}
