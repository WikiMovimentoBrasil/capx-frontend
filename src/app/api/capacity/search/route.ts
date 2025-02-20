import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchQuery = req.nextUrl.searchParams.get("q");
    const language = req.nextUrl.searchParams.get("language");
    const authHeader = req.headers.get("authorization");

    // Buscar todas as capacidades
    const codesResponse = await axios.get(
      `${process.env.BASE_URL}/list/skills/`,
      {
        headers: { Authorization: authHeader },
      }
    );

    const codes = Object.entries(codesResponse.data).map(([key, value]) => ({
      code: Number(key),
      wd_code: value,
    }));

    // Buscar nomes no Wikidata
    const wdCodeList = codes.map((code) => "wd:" + code.wd_code);
    const queryText = `SELECT ?item ?itemLabel WHERE {VALUES ?item {${wdCodeList.join(
      " "
    )}} SERVICE wikibase:label { bd:serviceParam wikibase:language '${language},en'.}}`;

    const wikidataResponse = await axios.get(
      `https://query.wikidata.org/bigdata/namespace/wdq/sparql?format=json&query=${queryText}`
    );

    const organizedData = wikidataResponse.data.results.bindings
      .map((wdItem) => ({
        wd_code: wdItem.item.value.split("/").slice(-1)[0],
        name: wdItem.itemLabel.value,
      }))
      .filter((item) =>
        item.name.toLowerCase().includes(searchQuery?.toLowerCase() || "")
      );

    const searchResults = codes
      .map((obj1) => {
        const obj2 = organizedData.find(
          (obj2) => obj2.wd_code === obj1.wd_code
        );
        return obj2 ? { ...obj1, ...obj2 } : null;
      })
      .filter(Boolean);

    return NextResponse.json(searchResults);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to search capacities" },
      { status: 500 }
    );
  }
}
