import axios from "axios";

export default async function check(req, res) {
  if (req.method === "POST") {
    const checkResponse = await axios.post(process.env.BASE_URL + '/api/login/social/check/', { oauth_token: req.body.oauth_token });
    if (checkResponse.data.exists) {
      res.status(200).json(checkResponse.data.extra);
    } else {
     res.status(404);
    }
  } else {
    res.status(405);
  }
  res.end();
}