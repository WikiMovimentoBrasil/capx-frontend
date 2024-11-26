import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const language = req.nextUrl.searchParams.get("language");
    const authHeader = req.headers.get("authorization");

    const skillsByType = await axios.get(
      `${process.env.BASE_URL}/skills_by_type/${params.id}/`,
      { headers: { Authorization: authHeader } }
    );

    /*     const codesResponse = await axios.get(
      `${process.env.BASE_URL}/list/skills/`,
      { headers: { Authorization: authHeader } }
    );

    const relevantCodes = Object.entries(codesResponse.data)
      .filter(([key]) => skillsByType.data.includes(Number(key)))
      .map(([key, value]) => ({
        code: key,
        wd_code: value,
      })); */

    /*     const wdCodeList = relevantCodes.map((code) => "wd:" + code.wd_code);
    const queryText = `SELECT ?item ?itemLabel WHERE {
      VALUES ?item {${wdCodeList.join(" ")}}
      SERVICE wikibase:label { bd:serviceParam wikibase:language '${language},en'.}
    }`;

    const wikidataResponse = await axios.get(
      `https://query.wikidata.org/bigdata/namespace/wdq/sparql?format=json&query=${encodeURIComponent(
        queryText
      )}`
    );

    const result = relevantCodes.reduce((acc, code) => {
      const wdItem = wikidataResponse.data.results.bindings.find(
        (item) => item.item.value.split("/").slice(-1)[0] === code.wd_code
      );
      if (wdItem) {
        acc[code.code] = wdItem.itemLabel.value;
      }
      return acc;
    }, {} as Record<string, string>); */

    return NextResponse.json(skillsByType);
  } catch (error) {
    console.error("Error in capacity type route:", error);
    return NextResponse.json(
      { error: "Failed to fetch capacity data" },
      { status: 500 }
    );
  }
}
