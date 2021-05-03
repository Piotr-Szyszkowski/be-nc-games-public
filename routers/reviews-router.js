const express = require("express");
const {
  getReviews,
  getReviewsById,
  patchReviewsById,
} = require("../controllers/reviews-controller");
const reviewsRouter = express.Router();

reviewsRouter.get("/", getReviews);
reviewsRouter.route("/:review_id").get(getReviewsById).patch(patchReviewsById);

module.exports = reviewsRouter;
