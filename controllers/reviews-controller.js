const selectReviews = require(`../models/reviews-model`);

const getReviews = (request, response, next) => {
  const { sort_by, order, category } = request.query;
  selectReviews(sort_by, order, category)
    .then((reviews) => {
      response.status(200).send({ reviews });
    })
    .catch(next);
};

module.exports = getReviews;
