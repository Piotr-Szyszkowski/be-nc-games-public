const db = require(`../db/connection`);

const selectReviews = (
  sort_by = "created_at",
  order = "desc",
  category = "%"
) => {
  return db
    .query(
      `SELECT reviews.*, COUNT(comments.review_id) AS comment_count
       FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id 
       WHERE reviews.category LIKE '${category}'
       GROUP BY reviews.review_id 
       ORDER BY ${sort_by} ${order.toUpperCase()};`
    )
    .then((selectReviewsResponse) => {
      return selectReviewsResponse.rows;
    });
};

module.exports = selectReviews;
