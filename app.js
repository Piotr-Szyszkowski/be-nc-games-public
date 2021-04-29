const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router.js");

app.use("/api", apiRouter);

//error handler below
app.use((error, request, response, next) => {
  response.status(500).send({ message: "Internal Server Error Dude" });
});

module.exports = app;
