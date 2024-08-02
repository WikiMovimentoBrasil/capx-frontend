import axios from "axios";

export default async function userProfile(req, res) {
  if (req.method === "GET") {
    const queryResponse = await axios.get(process.env.BASE_URL + "/users/" + req.query.userId, {
      headers: {
        'Authorization': req.headers.authorization
      }
    });
    res.status(200).json(queryResponse.data);
  }
  else if (req.method === "POST") {
    const postBody = req.body;
    const userId = postBody.user.id;

    const queryResponse = await axios.put(process.env.BASE_URL + "/profile/" + userId + "/", postBody, {
      headers: {
        'Authorization': req.headers.authorization
      }
    })
    res.status(200).json(queryResponse.data);
  }
  else if (req.method === "OPTIONS") {
    const queryResponse = await axios.options(process.env.BASE_URL + "/profile/" + req.query.userId, {
      headers: {
        'Authorization': req.headers.authorization
      }
    });
    // Removing "user" key/value
    const { user, ...formFields } = queryResponse.data.actions.PUT;

    res.status(200).json(formFields);
  }
  else if (req.method === "DELETE") {
    const queryResponse = await axios.delete(process.env.BASE_URL + "/profile/" + req.query.userId,{
      headers: {
        'Authorization': req.headers.authorization
      }
    });

    res.status(200).json(queryResponse.data);
  }
  else {
    res.status(405);
  }
  res.end();
}