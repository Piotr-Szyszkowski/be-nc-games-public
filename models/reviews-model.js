const db = require(`../db/connection`);

const selectReviews = (
  sort_by = "created_at",
  order = "desc",
  category = "%"
) => {
  const okSortByList = [
    `review_id`,
    `title`,
    `designer`,
    `votes`,
    `category`,
    `owner`,
    `created_at`,
    `comment_count`,
  ];
  if (!okSortByList.includes(sort_by)) {
    return Promise.reject({
      status: 400,
      message: `You cannot sort reviews by ${sort_by}!!`,
    });
  }
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
