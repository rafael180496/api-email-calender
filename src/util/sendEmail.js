const { postData } = require("./fetch");

const sendEmail = async (dataEvent, infoEvent) => {
  const { organizer, subject, description } = infoEvent;
  const data64 = new Buffer.from(dataEvent);
  const dataTest = {
    sender: {
      ...organizer,
    },
    to: [
      {
        email: "rafael180496@gmail.com",
        name: "John Doe",
      },
    ],
    attachment: [{ content: data64.toString("base64"), name: "calendar.ics" }],
    subject,
    htmlContent: description,
    headers: {
      "X-Mailin-custom":
        "custom_header_1:custom_value_1|custom_header_2:custom_value_2|custom_header_3:custom_value_3",
      charset: "iso-8859-1",
    },
  };
  console.log("[KEY]:", process.env.CALENDER_API_KEY);

  return await postData(
    "https://api.sendinblue.com/v3/smtp/email",
    dataTest,
    "POST",
    {
      "Content-Type": "application/json",
      accept: "application/json",
      "api-key": process.env.CALENDER_API_KEY,
    }
  );
};

module.exports = {
  sendEmail: sendEmail,
};
