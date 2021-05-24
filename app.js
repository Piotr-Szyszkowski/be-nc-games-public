const cors = require("cors");
const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router.js");
const {
  handleRouteNotFound,
  handleInternalServerErrors,
  handleCustomErrors,
} = require(`./controllers/error-handlers`);

app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

/* *** ERROR HANDLER BELOW *** */

app.all(`/*`, handleRouteNotFound);

app.use(handleCustomErrors);

app.use(handleInternalServerErrors);

module.exports = app;
