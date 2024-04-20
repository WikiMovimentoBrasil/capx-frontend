import axios from "axios";

export default async function startLogin(req, res) {
  if (req.method === "POST") {
    const startLoginResponse = await axios.post(process.env.START_LOGIN_URL);
    if (startLoginResponse.data.oauth_callback_confirmed) {
      res.status(200).json(startLoginResponse.data);
    } else {
      res.status(500);
    }
  }
  else {
    res.status(405);
  }
  res.end();
}