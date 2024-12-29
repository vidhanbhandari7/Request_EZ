const express = require("express");
const cors = require("cors");
const axios = require("axios");
const e = require("express");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/recreq", async (req, res) => {
  try {
    let reqObj = {};
    Object.assign(reqObj, { ["url"]: req.body.url });
    Object.assign(reqObj, { ["method"]: req.body.method });
    Object.assign(reqObj, { ["body"]: req.body.body });
    Object.assign(reqObj, { ["headers"]: req.body.headers });
    console.log(reqObj);
    console.log(reqObj.method.toUpperCase());
    let response = { data: "Hello World" };

    if (reqObj.method.toUpperCase() === "GET") {
   
    const fetchRes = await fetch(reqObj.url, {
      method: "GET",
      headers: reqObj.headers,
      body: JSON.stringify(reqObj.body),
    });
    if(fetchRes.ok){
    const jsonData = await fetchRes.json();
        console.log(jsonData);
    }
    else{
      console.error("request failed", fetchRes.status);
    }

      

    response = await axios.get(reqObj.url, reqObj.body);
    } else if (reqObj.method.toUpperCase() === "POST") {
      response = await axios.post(reqObj.url, reqObj.body, {
        headers: reqObj.headers,

      });

    } else if (reqObj.method.toUpperCase() === "PUT") {
      response = await axios.put(reqObj.url, reqObj.body, {
        headers: reqObj.headers,
      });
    } else if (reqObj.method.toUpperCase() === "DELETE") {
      response = await axios.delete(reqObj.url, reqObj.body, {
        headers: reqObj.headers,
      });
    } else if (reqObj.method.toUpperCase() === "PATCH") {
      response = await axios.patch(reqObj.url, reqObj.body, {
        headers: reqObj.headers,
      });
    } else {
      res.status(400).send("Invalid Method");
    }
    console.log(reqObj.body);
    res.status(200).send(response.data);
  } catch (er) {
    console.log(er);
    res.status(400).send("Something Went Wrong");
  }
});

app.listen(port, "127.0.0.1", () => {
  console.log(`Example app listening on port ${port} @ ${"127.0.0.1"}`);
});
