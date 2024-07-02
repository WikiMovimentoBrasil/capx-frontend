import axios from "axios";

export default async function getTagData(req, res) {
  if (req.method === "GET") {
    const { id, category, language } = req.query;
  }
  else {
    res.status(405);
  }
  res.end();
}