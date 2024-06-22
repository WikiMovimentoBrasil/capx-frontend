import axios from "axios";

export default async function capacity(req, res) {
  if (req.method === "GET") {
    try {
      // Fetching codes
      const codesResponse = await axios.get(process.env.BASE_URL + "/list_skills", {
        headers: {
          'Authorization': req.headers.authorization
        }
      });

      const codes = Object.entries(codesResponse.data).map(([key, value]) => ({
        code: Number(key),
        wd_code: value
      }));

      //Fetching names based on codes
      const wdCodeList = codes.map((code) => "wd:" + code.wd_code.toString());
      const queryTextPart01 = "SELECT ?item ?itemLabel WHERE {VALUES ?item {";
      const queryTextPart02 = "} SERVICE wikibase:label { bd:serviceParam wikibase:language '" + req.query.language + ",en'.}}";
      const namesResponse = await axios.get(process.env.WIKIDATA_BASE_URL + queryTextPart01 + wdCodeList.join(" ") + queryTextPart02);
      const names = namesResponse.data.results.bindings.map((wdItem) => wdItem.itemLabel.value);

      const codesWithNames = codes.map((item, index) => ({
        ...item,
        name: names[index]
      }));

      res.status(200).json({
        data: codesWithNames
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data." });
    }
  }
  else {
    res.status(405);
  }
  res.end();
}