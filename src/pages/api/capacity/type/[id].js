import axios from "axios";

export default async function getSkillsByType(req, res) {
  if (req.method === "GET") {
    try {
      const capacityId = req.query.id;
      const response = await axios.get(process.env.BASE_URL + "/skills_by_type/" + capacityId, {
        headers: {
          'Authorization': req.headers.authorization
        }
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data." });
    }
  }
  else {
    res.status(405);
  }
  res.end();
}