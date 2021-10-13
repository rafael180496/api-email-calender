const ics = require("ics");
const { response } = require("express");
const { sendEmail } = require("./sendEmail");

const genCalender = (data, res = response) => {
  const splitStart = data.begin.split("-");
  const splitEnd = data.end.split("-");
  const event = {
    start: [
      parseInt(splitStart[0]),
      parseInt(splitStart[1]),
      parseInt(splitStart[2]),
      parseInt(splitEnd[1]),
      parseInt(splitEnd[2]),
    ],
    duration: { hours: 6, minutes: 30 },
    title: data.subject,
    description: data.description,
    location: data.location,
    //  url: "http://www.bolderboulder.com/",
    // geo: { lat: 40.0095, lon: 105.2669 },
    // categories: ["10k races", "Memorial Day Weekend", "Boulder CO"],
    status: "CONFIRMED",
    // busyStatus: "BUSY",
    organizer: data.organizer,
    /* attendees: [
      {
        name: "Adam Gibbons",
        email: "adam@example.com",
        rsvp: true,
        partstat: "ACCEPTED",
        role: "REQ-PARTICIPANT",
      },
      {
        name: "Brittany Seaton",
        email: "brittany@example2.org",
        dir: "https://linkedin.com/in/brittanyseaton",
        role: "OPT-PARTICIPANT",
      },
    ],*/
  };
  ics.createEvent(event, async (error, value) => {
    if (error) {
      res.status(500).json({ status: 500, error });
      return;
    }
    const ics = value;
    const resEmail = await sendEmail(ics, data);
    res.status(200).json(resEmail);
    return;
  });
};

module.exports = {
  genCalender,
};
