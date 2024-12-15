import axios from "axios";

export default async function check(req, res) {
  if (req.method === "POST") {
    const checkResponse = await axios.post(process.env.CHECK_URL, { oauth_token: req.query.oauth_token });
    if (checkResponse.data.exists) {
     if (checkResponse.data.extra !== req.headers.host) {
       res.status(200).json(checkResponse.data.extra);
     }
    } else {
     res.status(404);
    }
  } else {
    res.status(405);
  }
  res.end();
}