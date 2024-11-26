import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const language = req.nextUrl.searchParams.get("language");
    const authHeader = req.headers.get("authorization");

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

    if (codes.length === organizedData.length) {
      const codesWithNames = codes.map((obj1) => {
        const obj2 = organizedData.find(
          (obj2) => obj2.wd_code === obj1.wd_code
        );
        return { ...obj1, ...obj2 };
      });

      return NextResponse.json(codesWithNames);
    } else {
      return NextResponse.json({ error: "Data mismatch." }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data." },
      { status: 500 }
    );
  }
}
