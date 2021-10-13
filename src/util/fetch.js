const fetch = require('node-fetch');
const postData = async (
  url = "",
  data,
  action = "POST",
  headers = { "Content-Type": "application/json" }
) => {
  const response = await fetch(url, {
    method: action,
    body: data ? JSON.stringify(data) : null,
    headers
  });
  return response.json();
};

module.exports = {
  postData: postData,
};
