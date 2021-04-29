const selectReviews = require(`../models/reviews-model`);

const getReviews = (request, response) => {
  selectReviews().then((reviews) => {
    response.status(200).send({ reviews });
  });
};

module.exports = getReviews;
