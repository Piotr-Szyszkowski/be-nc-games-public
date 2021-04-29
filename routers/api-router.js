const express = require("express");
const apiRouter = express.Router();
const sendHelloFromApi = require("../controllers/api-controller");
const categoriesRouter = require("./categories-router");
const reviewsRouter = require("./reviews-router");

apiRouter.get("/", sendHelloFromApi);
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);

module.exports = apiRouter;
