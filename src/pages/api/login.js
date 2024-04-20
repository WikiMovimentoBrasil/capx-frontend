export default async function startLogin(req, res) {
  if (req.method === "POST") {
    res.status(200);
  }
  else {
    res.status(405);
  }
  res.end();
}