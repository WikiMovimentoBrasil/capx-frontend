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
      const codes = Object.values(codesResponse.data);

      //Fetching names based on codes
      const wdCodeList = codes.map((code) => "wd:" + code.toString());
      const queryTextPart01 = "SELECT ?item ?itemLabel WHERE {VALUES ?item {";
      const queryTextPart02 = "} SERVICE wikibase:label { bd:serviceParam wikibase:language 'pt-br,pt,en'.}}";
      const namesResponse = await axios.get(process.env.WIKIDATA_BASE_URL + queryTextPart01 + wdCodeList.join(" ") + queryTextPart02);
      const names = namesResponse.data.results.bindings.map((wdItem) => wdItem.itemLabel.value);

      res.status(200).json(
        {
          codes: codes,
          names: names
        }
      );
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data." });
    }
  }
  else {
    res.status(405);
  }
  res.end();
}