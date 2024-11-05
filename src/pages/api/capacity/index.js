import axios from "axios";

export default async function capacity(req, res) {
  if (req.method === "GET") {
    try {
      // Fetching codes
      const codesResponse = await axios.get(process.env.BASE_URL + "/list/skills/", {
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

      const wikidataResponse = await axios.get('https://query.wikidata.org/bigdata/namespace/wdq/sparql?format=json&query=' + queryTextPart01 + wdCodeList.join(" ") + queryTextPart02);
      const organizedData = wikidataResponse.data.results.bindings.map((wdItem) => {
        return {
          wd_code: wdItem.item.value.split("/").slice(-1)[0],
          name: wdItem.itemLabel.value,
        }
      });

      // Checking if the size of the data list matches the code list
      if (codes.length === organizedData.length) {
        // Merging arrays by 'wd_code' key because
        // Wikidata do not return data in the same order
        const codesWithNames = codes.map(obj1 => {
          const obj2 = organizedData.find(obj2 => obj2.wd_code === obj1.wd_code);
          return { ...obj1, ...obj2 };
        });

        res.status(200).json(codesWithNames);
      } else {
        res.status(500);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data." });
    }
  }
  else {
    res.status(405);
  }
  res.end();
}