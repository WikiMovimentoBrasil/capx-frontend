import axios from "axios";

export default async function getTagData(req, res) {
  if (req.method === "GET") {
    const { id, category } = req.query;

    // Requesting list of tag codes (based on chosen category)
    const codeList = await axios.get(process.env.BASE_URL + `/list_${category}`, {
      headers: {
        'Authorization': req.headers.authorization
      }
    });
    res.status(200);
  }
  else {
    res.status(405);
  }
  res.end();
}