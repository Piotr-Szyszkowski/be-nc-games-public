const { selectReviews, selectReviewsById } = require(`../models/reviews-model`);

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
  selectReviewsById(review_id).then((review) => {
    console.log(review);
    response.status(200).send({ review });
  });
};

module.exports = { getReviews, getReviewsById };
