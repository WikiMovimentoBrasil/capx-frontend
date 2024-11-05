import axios from "axios";

export default async function listResources(req, res) {
  if (req.method === "GET") {
    await handleGetRequest(req, res);
  } else {
    res.status(405).end();
  }
}

async function handleGetRequest(req, res) {
  const resource = "/list/" + req.query.resource + "/";
  const baseRequestConfig = {
    headers: {
      'Authorization': req.headers.authorization
    }
  };

  try {
    const response = await axios.get(process.env.BASE_URL + resource, baseRequestConfig);
    res.status(200).json(response.data);
  }
  catch (error) {
    console.error("Error occurred:", error);
    res.status(500);
  }
  res.end();
}