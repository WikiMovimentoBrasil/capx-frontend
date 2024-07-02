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

    // Returning error if the requested id does not have a corresponding tag code
    if (codeList.data.hasOwnProperty(id) === false) {
      res.status(500).json({ error: "No item for this tag id." });
    }

    try {
      // Requesting the list of users who have the tag in their profile
      const userList = await axios.get(process.env.BASE_URL + `/tags/${category}/${id}`, {
        headers: {
          'Authorization': req.headers.authorization
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to request data." });
    }

    res.status(200);
  }
  else {
    res.status(405);
  }
  res.end();
}