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
      res.status(200).json(
        {
          codes: codes,
          names: ["Python", "JavaScript", "Java", "C#", "C++", "Ruby", "Swift", "Go"]
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