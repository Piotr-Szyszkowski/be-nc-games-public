const express = require("express");
const apiRouter = express.Router();
const sendHelloFromApi = require("../controllers/api-controller");
const categoriesRouter = require("./categories-router");

apiRouter.get("/", sendHelloFromApi);
apiRouter.use("/categories", categoriesRouter);

module.exports = apiRouter;
