import axios from "axios";

export default async function reportInstance(req, res) {
  if (req.method === "GET") {
    const reportId = req.query.reportId;
    const req_url = reportId ? ("/bugs/" + reportId) : ("/bugs");
    const queryResponse = await axios.get(process.env.BASE_URL + req_url, {
      headers: {
        'Authorization': req.headers.authorization
      }
    });

    res.status(200).json(queryResponse.data);
  }
  else if (req.method === "POST") {
    const postBody = req.body;
    const reportId = postBody.report;

    const queryResponse = await axios.put(process.env.BASE_URL + "/bugs/" + reportId + "/", postBody, {
      headers: {
        'Authorization': req.headers.authorization
      }
    })
    res.status(200).json(queryResponse.data);
  }
  else if (req.method === "OPTIONS") {
    const queryResponse = await axios.options(process.env.BASE_URL + "/bugs/" + req.query.reportId, {
      headers: {
        'Authorization': req.headers.authorization
      }
    });
    // Removing "user" key/value
    const { user, ...formFields } = queryResponse.data.actions.PUT;

    res.status(200).json(formFields);
  }
  else {
    res.status(405);
  }
  res.end();
}