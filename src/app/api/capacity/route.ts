import { getCapacityColor } from "@/lib/utils/capacitiesUtils";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const fetchWikidata = async (codes: any, language: string) => {
  // Continue with Wikidata query...
  const wdCodeList = codes.map((code) => "wd:" + code.wd_code);
  const queryText = `SELECT ?item ?itemLabel WHERE {VALUES ?item {${wdCodeList.join(
    " "
  )}} SERVICE wikibase:label { bd:serviceParam wikibase:language '${language},en'.}}`;

  const wikidataResponse = await axios.get(
    `https://query.wikidata.org/bigdata/namespace/wdq/sparql?format=json&query=${queryText}`
  );

  return wikidataResponse.data.results.bindings.map((wdItem) => ({
    wd_code: wdItem.item.value.split("/").slice(-1)[0],
    name: wdItem.itemLabel.value,
  }));
};

const fetchMetabase = async (codes: any, language: string) => {
  try {
    const mbQueryText = `PREFIX wbt:<https://metabase.wikibase.cloud/prop/direct/>  
  SELECT ?item ?itemLabel ?itemDescription ?value WHERE {  
    VALUES ?value {${codes.map((code) => `"${code.wd_code}"`).join(" ")}}  
    ?item wbt:P1 ?value.  
    SERVICE wikibase:label { bd:serviceParam wikibase:language '${language},en'. }}`;

    const response = await axios.post(
      "https://metabase.wikibase.cloud/query/sparql?format=json&query=" +
        encodeURIComponent(mbQueryText),
      {
        headers: {
          "Content-Type": "application/sparql-query",
          Accept: "application/sparql-results+json",
          "User-Agent": "CapX/1.0",
        },
      }
    );

    return response.data.results.bindings.map((mbItem) => ({
      code: codes.find((c) => c.wd_code === mbItem.value.value)?.code,
      wd_code: mbItem.value.value,
      name: mbItem.itemLabel.value,
    }));
  } catch (error) {
    console.error("Error in fetchMetabase:", error);
    console.error("Error stack:", error.stack);
    return [];
  }
};

export async function GET(req: NextRequest) {
  try {
    const language = req.nextUrl.searchParams.get("language");
    const authHeader = req.headers.get("authorization");

    // Get all skills
    const codesResponse = await axios.get(
      `${process.env.BASE_URL}/list/skills/`,
      {
        headers: { Authorization: authHeader },
      }
    );

    // Get all skills by type to identify root items
    const skillsByTypeResponse = await axios.get(
      `${process.env.BASE_URL}/skills_by_type/0/`,
      { headers: { Authorization: authHeader } }
    );

    // Root items are those in skills_by_type/0/
    const rootSkillIds = Array.isArray(skillsByTypeResponse.data)
      ? skillsByTypeResponse.data
      : Object.keys(skillsByTypeResponse.data).map(Number);

    // Filter codes to only include root items
    const codes = Object.entries(codesResponse.data)
      .filter(([key]) => rootSkillIds.includes(Number(key)))
      .map(([key, value]) => ({
        code: Number(key),
        wd_code: value,
      }));
    const metabaseResponse = await fetchMetabase(codes, language ?? "en");

    const wikidataResponse = await fetchWikidata(codes, language ?? "en");

    const codesWithNames = codes.map((obj1) => {
      const metabaseMatch = metabaseResponse.find(
        (mb) => mb.wd_code === obj1.wd_code
      );
      const wikidataMatch = wikidataResponse.find(
        (wd) => wd.wd_code === obj1.wd_code
      );

      return {
        ...obj1,
        name: metabaseMatch?.name || wikidataMatch?.name || obj1.wd_code,
        color: getCapacityColor(obj1.code.toString()),
      };
    });
    return NextResponse.json(codesWithNames);
  } catch (error) {
    console.error("Error details:", error);
    return NextResponse.json(
      { error: "Failed to fetch data.", details: error.message },
      { status: 500 }
    );
  }
}
