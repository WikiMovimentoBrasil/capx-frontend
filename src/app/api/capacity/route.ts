import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

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

    // Continue with Wikidata query...
    const wdCodeList = codes.map((code) => "wd:" + code.wd_code);
    const queryText = `SELECT ?item ?itemLabel WHERE {VALUES ?item {${wdCodeList.join(
      " "
    )}} SERVICE wikibase:label { bd:serviceParam wikibase:language '${language},en'.}}`;

    const wikidataResponse = await axios.get(
      `https://query.wikidata.org/bigdata/namespace/wdq/sparql?format=json&query=${queryText}`
    );

    const organizedData = wikidataResponse.data.results.bindings.map(
      (wdItem) => ({
        wd_code: wdItem.item.value.split("/").slice(-1)[0],
        name: wdItem.itemLabel.value,
      })
    );

    const codesWithNames = codes.map((obj1) => {
      const obj2 = organizedData.find((obj2) => obj2.wd_code === obj1.wd_code);
      return obj2 ? { ...obj1, ...obj2 } : { ...obj1, name: obj1.wd_code };
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
