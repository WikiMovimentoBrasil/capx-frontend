import axios from "axios";

const acceptedResources = process.env.ACCEPTED_RESOURCES.split(",");

export default async function listResources(req, res) {
  if (req.method === "GET") {
    const resource = "list_" + req.query.resource;
    
    if (acceptedResources.includes(resource)) {
      const queryResponse = await axios.get(process.env.BASE_URL + "/" + resource, {
        headers: {
          'Authorization': req.headers.authorization
        }
      });
      res.status(200).json(queryResponse.data);
    }
    else {
      res.status(400);
    }
  }
  else {
    res.status(405);
  }
  res.end();
}