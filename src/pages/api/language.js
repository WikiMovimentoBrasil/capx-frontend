import fs from 'fs';
import path from 'path';

export default async function language(req, res) {
  if (req.method === "GET") {
    if (req.query.lang) {
      //Loads default language (English) content
      const defaultFilePath = path.join(process.cwd(), 'locales', 'en.json');
      const defaultPageContent = JSON.parse(fs.readFileSync(defaultFilePath, 'utf8'));

      //Loads requested language content
      const filePath = path.join(process.cwd(), 'locales', `${req.query.lang}.json`);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      //Merging default language content with requested language content
      let compiledData = { ...defaultPageContent, ...data };
      res.status(200).json(compiledData);
    }
    else {
      const localesDir = path.join(process.cwd(), 'locales');
      const files = fs.readdirSync(localesDir);
      const languages = files
        .filter(file => file !== 'qqq.json') // Ignore file qqq.json
        .map(file => path.basename(file, '.json'));
      res.status(200).json(languages);
    }
  }
  else {
    res.status(405);
  }
  res.end();
}