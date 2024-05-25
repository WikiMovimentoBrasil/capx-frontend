import fs from 'fs';
import path from 'path';

export default async function language(req, res) {
  if (req.method === "GET") {
    const filePath = path.join(process.cwd(), 'locales', `${req.query.lang}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.status(200).json(data);
  }
  else {
    res.status(405);
  }
  res.end();
}