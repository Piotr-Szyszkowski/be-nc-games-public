const db = require(`../db/connection`);

const selectReviews = (request, response) => {
  return db.query(`SELECT * FROM reviews;`).then((selectReviewsResponse) => {
    return selectReviewsResponse.rows;
  });
};

module.exports = selectReviews;
