const {
  selectReviews,
  selectReviewsById,
  updateReviewById,
} = require(`../models/reviews-model`);

const getReviews = (request, response, next) => {
  const { sort_by, order, category } = request.query;
  selectReviews(sort_by, order, category)
    .then((reviews) => {
      response.status(200).send({ reviews });
    })
    .catch(next);
};

const getReviewsById = (request, response, next) => {
  const { review_id } = request.params;
  selectReviewsById(review_id)
    .then((review) => {
      response.status(200).send({ review });
    })
    .catch(next);
};
const patchReviewsById = async (request, response, next) => {
  const { review_id } = request.params;
  const reviewForPatching = await selectReviewsById(review_id);
};

module.exports = { getReviews, getReviewsById, patchReviewsById };
