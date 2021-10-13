const { request, response } = require("express");
const version = (req = request, res = response) => {
  res.status(200).send(`service calender ${process.env.CALENDER_VERSION}`);
};

module.exports = { version };
