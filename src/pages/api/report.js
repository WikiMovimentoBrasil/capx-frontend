import axios from "axios";

export default async function reportInstance(req, res) {
  if (req.method === "GET") {
    const reportId = req.query.reportId;
    const req_url = reportId ? "/bugs/" + reportId : "/bugs";
    const queryResponse = await axios.get(process.env.BASE_URL + req_url, {
      headers: {
        Authorization: req.headers.authorization,
      },
    });

    res.status(200).json(queryResponse.data);
  } else if (req.method === "POST") {
    const postBody = req.body;

    try {
      const queryResponse = await axios.post(
        process.env.BASE_URL + "/bugs/",
        postBody,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        }
      );
      res.status(200).json(queryResponse.data);
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .json(error.response?.data || {});
    }
  } else if (req.method === "DELETE") {
    const reportId = req.query.reportId;

    try {
      const queryResponse = await axios.delete(
        process.env.BASE_URL + "/bugs/" + reportId,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        }
      );
      res.status(204).end();
    } catch (error) {
      res
        .status(error.response?.status || 500)
        .json(error.response?.data || {});
    }
  } else if (req.method === "OPTIONS") {
    const queryResponse = await axios.options(
      process.env.BASE_URL + "/bugs/" + req.query.reportId,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );
    const { user, ...formFields } = queryResponse.data.actions.PUT;
    res.status(200).json(formFields);
  }

  res.end();
}
