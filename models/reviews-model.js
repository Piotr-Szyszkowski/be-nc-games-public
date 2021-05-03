const db = require(`../db/connection`);
const format = require(`pg-format`);

const selectReviews = async (
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
  const okOrderOptions = [`asc`, `desc`];
  if (!okOrderOptions.includes(order)) {
    return Promise.reject({
      status: 400,
      message: `Invalid <order> format. Please enter <asc> for ascending, or <desc> for descending.`,
    });
  }
  if (category !== `%`) {
    const existingCategoriesRaw = await db.query(
      `SELECT slug FROM categories;`
    );
    const existingCategories = existingCategoriesRaw.rows.map(
      (catObj) => catObj.slug
    );
    if (!existingCategories.includes(category)) {
      return Promise.reject({
        status: 404,
        message: `Category ${category} does not exist in our database. Please try another one.`,
      });
    }
    const presentCategoriesRaw = await db.query(
      `SELECT category FROM reviews;`
    );
    const presentCategories = presentCategoriesRaw.rows.map(
      (catObj) => catObj.category
    );
    if (!presentCategories.includes(category)) {
      return Promise.reject({
        status: 404,
        message: `Category ${category} does not match any reviews in our database. Please try another one.`,
      });
    }
  }

  /*return db
    .query(`SELECT category FROM reviews;`)
    .then((sth) => {
      console.log(sth.rows);
    })*/
  /*.then(() => {*/
  return db
    .query(
      `SELECT reviews.owner, reviews.title, reviews.review_id, reviews.designer, reviews.category, reviews.created_at, reviews.votes, COUNT(comments.review_id) AS comment_count
      FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id 
      WHERE reviews.category LIKE '${category}'
      GROUP BY reviews.review_id 
      ORDER BY ${sort_by} ${order.toUpperCase()};`
    )

    .then((selectReviewsResponse) => {
      return selectReviewsResponse.rows;
    });
};

const selectReviewsById = async (review_id) => {
  let queryString = format(
    `SELECT reviews.*, COUNT(comments.review_id) AS comment_count FROM reviews
  LEFT JOIN comments ON reviews.review_id = comments.review_id
  WHERE reviews.review_id = %L
   GROUP BY reviews.review_id;`,
    [[review_id]]
  );
  const reviewWithIdRaw = await db.query(queryString);
  const theReview = reviewWithIdRaw.rows[0];
  return theReview;
};

module.exports = { selectReviews, selectReviewsById };
/* working query - for laters
`SELECT reviews.*, COUNT(comments.review_id) AS comment_count
       FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id 
       WHERE reviews.category LIKE '${category}'
       GROUP BY reviews.review_id 
       ORDER BY ${sort_by} ${order.toUpperCase()};`*/
