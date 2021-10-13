require("dotenv").config();
const express = require("express");
const { version } = require("./service/version");
const { generateEvent } = require("./service/calender");
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
const app = express();

//config
const port = process.env.CALENDER_PORT;
app.use(cors());
app.use(urlencoded({ extended: false }));
// parse application/json
app.use(json());

//path
app.get("/", version);
app.post("/addevent", generateEvent);

console.log("[port]:", port);
app.listen(port);
