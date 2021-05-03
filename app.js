const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router.js");
const {
  handleRouteNotFound,
  handleInternalServerErrors,
  handleCustomErrors,
} = require(`./controllers/error-handlers`);

app.use("/api", apiRouter);

/* *** ERROR HANDLER BELOW *** */

app.all(`/*`, handleRouteNotFound);

app.use(handleCustomErrors);

app.use(handleInternalServerErrors);

module.exports = app;
