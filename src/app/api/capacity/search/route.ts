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

    // Buscar informações detalhadas de cada capacidade encontrada
    const searchResults = await Promise.all(
      codes
        .map(async (obj1) => {
          const obj2 = organizedData.find(
            (obj2) => obj2.wd_code === obj1.wd_code
          );
          if (!obj2) return null;

          // Buscar detalhes da capacidade, incluindo skill_type
          try {
            const detailsResponse = await axios.get(
              `${process.env.BASE_URL}/skill/${obj1.code}/`,
              {
                headers: { Authorization: authHeader },
              }
            );

            return {
              ...obj1,
              ...obj2,
              skill_type: detailsResponse.data.skill_type || [],
            };
          } catch (error) {
            console.error(
              `Failed to fetch details for skill ${obj1.code}:`,
              error
            );
            return null;
          }
        })
        .filter(Boolean)
    );

    return NextResponse.json(searchResults);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search capacities" },
      { status: 500 }
    );
  }
}
