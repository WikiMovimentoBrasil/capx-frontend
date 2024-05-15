import axios from "axios";

export default async function userProfile(req, res) {
  if (req.method === "GET") {
    const queryResponse = await axios.get(process.env.PROFILE_URL + "/" + req.query.userId, {
      headers: {
        'Authorization': req.headers.authorization
      }
    });
    res.status(200).json(queryResponse.data);
  }
  else if (req.method === "POST") {
    const postBody = req.body;
    const userId = postBody.user.id;

    const queryResponse = await axios.put(process.env.PROFILE_URL + "/" + userId + "/", postBody, {
      headers: {
        'Authorization': req.headers.authorization
      }
    })
    res.status(200).json(queryResponse.data);
  }
  else if (req.method === "OPTIONS") {
    const queryResponse = await axios.options(process.env.PROFILE_URL + "/" + req.query.userId, {
      headers: {
        'Authorization': req.headers.authorization
      }
    });
    // Removing "user" key/value
    const { user, ...formFields } = queryResponse.data.actions.PUT;
    // Converting into an array of objects
    const formFieldsArray = Object.entries(formFields).map(([key, value]) => {
      return { key, ...value };
    });

    res.status(200).json(formFieldsArray);
  }
  else {
    res.status(405);
  }
  res.end();
}