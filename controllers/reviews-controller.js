const selectReviews = require(`../models/reviews-model`);

const getReviews = (request, response) => {
  console.log(request.query);
  const { sort_by, order } = request.query;
  selectReviews(sort_by, order).then((reviews) => {
    response.status(200).send({ reviews });
  });
};

module.exports = getReviews;
