const schemaCalender = {
  type: "object",
  properties: {
    subject: { type: "string" },
    location: { type: "string" },
    description: { type: "string" },
    begin: { type: "string", format: "date" },
    end: { type: "string", format: "date" },
    organizer: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string", format: "email" },
      },
      required: ["name", "email"],
    },
  },
  required: ["subject", "description", "begin", "end", "location", "organizer"],
};

module.exports = { schemaCalender };
