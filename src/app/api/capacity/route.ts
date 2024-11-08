import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const language = searchParams.get("language") || "en";
  const authHeader = request.headers.get("authorization");

  try {
    // Fetching codes
    const codesResponse = await axios.get(
      `${process.env.BASE_URL}/list/skills/`,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    const codes = Object.entries(codesResponse.data).map(([key, value]) => ({
      code: Number(key),
      wd_code: value,
    }));

    // Fetching names based on codes
    const wdCodeList = codes.map((code) => "wd:" + code.wd_code?.toString());
    const queryTextPart01 = "SELECT ?item ?itemLabel WHERE {VALUES ?item {";
    const queryTextPart02 = `} SERVICE wikibase:label { bd:serviceParam wikibase:language '${language},en'.}}`;

    const wikidataResponse = await axios.get(
      "https://query.wikidata.org/bigdata/namespace/wdq/sparql?format=json&query=" +
        queryTextPart01 +
        wdCodeList.join(" ") +
        queryTextPart02
    );

    const organizedData = wikidataResponse.data.results.bindings.map(
      (wdItem) => ({
        wd_code: wdItem.item.value.split("/").slice(-1)[0],
        name: wdItem.itemLabel.value,
      })
    );

    // Check if sizes match
    if (codes.length !== organizedData.length) {
      return NextResponse.json(
        { error: "Data size mismatch" },
        { status: 500 }
      );
    }

    // Merge arrays by 'wd_code'
    const codesWithNames = codes.map((obj1) => {
      const obj2 = organizedData.find((obj2) => obj2.wd_code === obj1.wd_code);
      return { ...obj1, ...obj2 };
    });

    return NextResponse.json(codesWithNames);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
