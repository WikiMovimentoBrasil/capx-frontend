import axios from "axios";

export default async function getCapacityData(req, res) {
  if (req.method === "GET") {
    try {
      const { id, language } = req.query;

      // Requesting list of wikidata codes
      const codeList = await axios.get(process.env.BASE_URL + "/list/skills/", {
        headers: {
          'Authorization': req.headers.authorization
        }
      });

      // Returning error if the requested id does not have a corresponding wikidata code
      if (codeList.data.hasOwnProperty(id) === false) {
        res.status(500).json({ error: "No wikidata item for this capacity id." });
      }

      // Requesting list of users who have the capacity in their profile
      const userList = await axios.get(process.env.BASE_URL + "/users_by_skill/" + id + "/", {
        headers: {
          'Authorization': req.headers.authorization
        }
      });

      const capacityCodes = {
        code: id,
        wd_code: codeList.data[id],
        users: userList.data
      }

      // Requesting data from wikidata
      const capWikidataCode = "wd:" + capacityCodes.wd_code.toString();
      const queryTextPart01 = "SELECT ?item ?itemLabel ?itemDescription WHERE {VALUES ?item {";
      const queryTextPart02 = "} SERVICE wikibase:label { bd:serviceParam wikibase:language '" + language + ",en'.}}";

      const wikidataResponse = await axios.get('https://query.wikidata.org/bigdata/namespace/wdq/sparql?format=json&query=' + queryTextPart01 + capWikidataCode + queryTextPart02);
      const capacityData = {
        name: wikidataResponse.data.results.bindings[0].itemLabel.value,
        description: wikidataResponse.data.results.bindings[0].itemDescription ? wikidataResponse.data.results.bindings[0].itemDescription.value : undefined
      }

      res.status(200).json({ ...capacityCodes, ...capacityData });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data." });
    }
  }
  else {
    res.status(405);
  }
  res.end();
}