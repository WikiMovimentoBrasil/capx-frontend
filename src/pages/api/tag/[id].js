import axios from "axios";

export default async function getTagData(req, res) {
  if (req.method === "GET") {
    const { id, category } = req.query;

    try {
      // Requesting list of tag codes (based on chosen category)
      const codeList = await axios.get(process.env.BASE_URL + `/list/${category}`, {
        headers: {
          'Authorization': req.headers.authorization
        }
      });

      // Returning error if the requested id does not have a corresponding tag code
      if (codeList.data.hasOwnProperty(id) === false) {
        res.status(500).json({ error: "No item for this tag id." });
      }

      try {
        // Requesting list of users who have the tag in their profile
        const userList = await axios.get(process.env.BASE_URL + `/tags/${category}/${id}`, {
          headers: {
            'Authorization': req.headers.authorization
          }
        });

        const tagData = {
          code: id,
          name: codeList.data[id],
          users: userList.data
        }
        res.status(200).json(tagData);
      }
      catch (error) {
        res.status(500).json({ error: "Failed to request list of users." });
      }
    }
    catch (error) {
      res.status(500).json({ error: "Failed to identify tag." });
    }
  }
  else {
    res.status(405);
  }
  res.end();
}