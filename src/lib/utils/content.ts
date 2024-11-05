import fs from "fs";
import path from "path";

export async function getPageContent(
  language: string
): Promise<Record<string, string>> {
  const filePath = path.join(process.cwd(), "locales", `${language}.json`);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}
