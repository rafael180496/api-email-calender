/*
Valida los esquema del proyecto a nivel json o params
*/
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const validateJSON = (schema = {}, body = {}) => {
  const ajv = new Ajv({ useDefaults: true });
  addFormats(ajv);
  try {
    const validate = ajv.compile(schema);
    const valid = validate(body);
    return {
      valid: valid,
      err: validate.errors,
      data: body,
    };
  } catch (error) {
    console.log(error);
    return {
      valid: false,
      err: null,
      data: null,
    };
  }
};
const validateDate = (start="", end="") => {
  const splitStart = start.split("-");
  const splitEnd = end.split("-");
  if (parseInt(splitStart[0]) > parseInt(splitEnd[0])) {
    return "the start date cannot be less than the end date";
  }
  if (parseInt(splitStart[0]) !== parseInt(splitEnd[0])) {
    return "must be from the same year";
  }
  if (
    parseInt(splitStart[0]) === parseInt(splitEnd[0]) &&
    parseInt(splitStart[1]) > parseInt(splitEnd[1])
  ) {
    return "the start date cannot be less than the end date";
  }
  if (
    parseInt(splitStart[0]) === parseInt(splitEnd[0]) &&
    parseInt(splitStart[1]) === parseInt(splitEnd[1]) &&
    parseInt(splitStart[2]) > parseInt(splitEnd[2])
  ) {
    return "the start date cannot be less than the end date";
  }
  return "";
};
module.exports = {
  validateJSON: validateJSON,
  validateDate: validateDate,
};
