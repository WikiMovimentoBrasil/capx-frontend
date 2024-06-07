import fs from 'fs';
import path from 'path';

export default async function language(req, res) {
  if (req.method === "GET") {
    if (req.query.lang) {
      const filePath = path.join(process.cwd(), 'locales', `${req.query.lang}.json`);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      res.status(200).json(data);
    }
    else {
      const localesDir = path.join(process.cwd(), 'locales');
      const files = fs.readdirSync(localesDir);
      const languages = files.map(file => path.basename(file, '.json'));
      res.status(200).json(languages);
    }
  }
  else {
    res.status(405);
  }
  res.end();
}