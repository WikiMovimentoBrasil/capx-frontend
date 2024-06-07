import axios from "axios";

export default async function listResources(req, res) {
  if (req.method === "GET") {
    await handleGetRequest(req, res);
  } else {
    res.status(405).end();
  }
}

async function handleGetRequest(req, res) {
  const resource = "list_" + req.query.resource;
  const baseRequestConfig = {
    headers: {
      'Authorization': req.headers.authorization
    }
  };

  try {
    const response = await axios.get(process.env.BASE_URL + '/', baseRequestConfig);
    const acceptedResources = Object.keys(response.data).filter(resource => resource.startsWith("list_"));

    if (acceptedResources.includes(resource)) {
      const queryResponse = await axios.get(process.env.BASE_URL + "/" + resource, baseRequestConfig);
      res.status(200).json(queryResponse.data);
    }
    else {
      res.status(400);
    }
  }
  catch (error) {
    console.error("Error occurred:", error);
    res.status(500);
  }
  res.end();
}