import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import axios from "axios";

export async function GET(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get("language") || "en";

    const codesResponse = await axios.get(
      `${process.env.BASE_URL}/list_skills`,
      {
        headers: {
          Authorization: request.headers.get("authorization"),
        },
      }
    );

    const codes = Object.entries(codesResponse.data).map(([key, value]) => ({
      code: Number(key),
      wd_code: value,
    }));

    const wdCodeList = codes.map((code) => "wd:" + code.wd_code.toString());
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

    if (codes.length === organizedData.length) {
      const codesWithNames = codes.map((obj1) => ({
        ...obj1,
        ...organizedData.find((obj2) => obj2.wd_code === obj1.wd_code),
      }));

      return NextResponse.json(codesWithNames);
    }

    return NextResponse.json({ error: "Data mismatch" }, { status: 500 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
