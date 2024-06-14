export default async function capacity(req, res) {
  if (req.method === "GET") {
    try {
      res.status(200).json(
        {
          codes: ["QI868829", "QI156335", "QI084535", "QI009950", "QI408880", "QI950523", "QI854288", "QI510796", "QI037437", "QI295487", "QI395971", "QI194607", "QI597943", "QI527631", "QI726398"],
          names: ["Python", "JavaScript", "Java", "C#", "C++", "Ruby", "Swift", "Go", "Kotlin", "PHP", "TypeScript", "Rust", "Perl", "Scala", "Haskell"]
        }
      );
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch data." });
    }
  }
  else {
    res.status(405);
  }
  res.end();
}