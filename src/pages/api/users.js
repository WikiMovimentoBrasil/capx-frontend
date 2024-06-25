import axios from "axios";

export default async function userProfile(req, res) {
  if (req.method === "GET") {
    const queryResponse = await axios.get(process.env.BASE_URL + "/users/" + req.query.userId, {
      headers: {
        'Authorization': req.headers.authorization
      }
    });
    res.status(200).json(queryResponse.data);
  }
  else {
    res.status(405);
  }
  res.end();
}