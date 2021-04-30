const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router.js");

app.use("/api", apiRouter);

/* *** ERROR HANDLER BELOW *** */

app.all(`/*`, (request, response, next) => {
  response
    .status(404)
    .send({ message: "This is not the route you want to follow" });
});

app.use((err, request, response, next) => {
  if (err.status && err.message) {
    response.status(err.status).send({ message: err.message });
  }
  response.status(500).send({ message: "Internal Server Error - Sorry Dude" });
});

module.exports = app;
