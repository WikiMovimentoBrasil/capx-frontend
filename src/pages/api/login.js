import axios from "axios";

export default async function startLogin(req, res) {
  if (req.method === "POST") {
    // Request with no body
    if (req.body.length === 0) {
      const startLoginResponse = await axios.post(process.env.LOGIN_STEP01_URL, { extra: req.headers.host });
      if (startLoginResponse.data.oauth_callback_confirmed) {
        const { oauth_token, oauth_token_secret } = startLoginResponse.data;
        const redirectURL = process.env.LOGIN_STEP02_URL;
        const redirectURLParams = `?oauth_token=${oauth_token}&oauth_token_secret=${oauth_token_secret}`;
        res.status(200).json({
          oauth_token,
          oauth_token_secret,
          redirect_url: redirectURL + redirectURLParams
        });
      } else {
        res.status(500);
      }
    }
  }
  else {
    res.status(405);
  }
  res.end();
}