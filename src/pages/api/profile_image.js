import axios from "axios";

export default async function profileImage(req, res) {
    if (req.method === "GET") {
        if (req.query.hasOwnProperty("query")) {
            const query = encodeURIComponent(req.query.query);
            const queryResponse = await axios.get("https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&srlimit=10&format=json&srsearch=" + query);
            if (!queryResponse.data.hasOwnProperty("query")) {
                res.status(404).json({ message: "No images found" });
            }
            const images = queryResponse.data.query.search.map(image => image.title);
            res.status(200).json(images);
        }
        else if (req.query.hasOwnProperty("title")) {
            const title = encodeURIComponent(req.query.title);
            const suffix = req.query.hasOwnProperty("thumb") ? "&width=100&height=50" : "&width=300&height=300";
            const queryResponse = await axios.get("https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/" + title + suffix);
            const image = queryResponse.request.res.responseUrl;
            res.status(200).json({ image });
        }
        else {
            res.status(400).json({ message: "Invalid query" });
        }   
  }
  else {
    res.status(405);
  }
  res.end();
}