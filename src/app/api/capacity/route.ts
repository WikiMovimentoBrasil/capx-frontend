import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  const language = searchParams.get("language");
  const authHeader = request.headers.get("authorization");

  try {
    // 1. Search of user skills
    const userSkillsResponse = await axios.get(
      `${process.env.BASE_URL}/skill/${userId}/`,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    // 2. Search of all skills
    const skillsResponse = await axios.get(
      `${process.env.BASE_URL}/list/skills/`,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    // 3. Transform data
    const skills = Object.entries(skillsResponse.data).map(([key, value]) => ({
      code: Number(key),
      wd_code: value,
    }));

    // 4. Check if there are skills to search
    if (skills.length === 0) {
      return NextResponse.json([]);
    }

    // 5. Build the query for Wikidata
    const wdCodes = skills.map((skill) => "wd:" + skill.wd_code);
    const wikiQuery = [
      "SELECT ?item ?itemLabel WHERE {",
      "VALUES ?item {" + wdCodes.join(" ") + "}",
      `SERVICE wikibase:label { bd:serviceParam wikibase:language '${language},en'. }`,
      "}",
    ].join(" ");

    // 6. Search Wikidata data
    const wikidataResponse = await axios.get(
      "https://query.wikidata.org/bigdata/namespace/wdq/sparql",
      {
        params: {
          format: "json",
          query: wikiQuery,
        },
      }
    );

    // 7. Organize and combine data
    const wikidata = wikidataResponse.data.results.bindings.map((item) => ({
      wd_code: item.item.value.split("/").slice(-1)[0],
      name: item.itemLabel.value,
    }));

    const combinedData = skills.map((skill) => {
      const wikidataItem = wikidata.find(
        (item) => item.wd_code === skill.wd_code
      );
      const userSkillData = userSkillsResponse.data.find(
        (item: any) => item.skill === skill.code
      );

      return {
        ...skill,
        ...wikidataItem,
        ...userSkillData,
      };
    });

    return NextResponse.json(combinedData);
  } catch (error: any) {
    console.error("Error in capacity route:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    return NextResponse.json(
      {
        error: "Failed to fetch capacity data",
        details: error.response?.data || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}
