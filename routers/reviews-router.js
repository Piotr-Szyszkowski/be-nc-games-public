const express = require("express");
// const commentsRouter = require(`./comments-router`);
const {
  getComments,
  postComments,
} = require(`../controllers/comments-controller`);
const {
  getReviews,
  getReviewsById,
  patchReviewsById,
} = require("../controllers/reviews-controller");
const reviewsRouter = express.Router();

reviewsRouter.get("/", getReviews);
reviewsRouter.route("/:review_id").get(getReviewsById).patch(patchReviewsById);
reviewsRouter.route(`/:review_id/comments`).get(getComments).post(postComments);

module.exports = reviewsRouter;
