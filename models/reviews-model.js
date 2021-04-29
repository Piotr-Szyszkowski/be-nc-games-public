const db = require(`../db/connection`);

const selectReviews = (request, response) => {
  return db
    .query(
      `SELECT reviews.*, COUNT(comments.review_id) AS comment_count
       FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id 
       GROUP BY reviews.review_id 
       ORDER BY created_at DESC;`
    )
    .then((selectReviewsResponse) => {
      return selectReviewsResponse.rows;
    });
};

module.exports = selectReviews;
