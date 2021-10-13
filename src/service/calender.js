const { request, response } = require("express");
const { validateJSON, validateDate } = require("../util/validate");
const { genCalender } = require("../util/calenderGen");
const { schemaCalender } = require("./calenderSchema");

const generateEvent = (req = request, res = response) => {
  const dataValid = validateJSON(schemaCalender, req.body);
  if (!dataValid.valid) {
    res.status(412).json({ status: 412, error: dataValid.err });
  } else {
    const { data } = dataValid;
    const { begin, end } = data;
    const msg = validateDate(begin, end);
    if (msg !== "") {
      res.status(412).json({ status: 412, error: msg });
    } else {
      genCalender(data, res);
    }
  }
};

module.exports = { generateEvent };
