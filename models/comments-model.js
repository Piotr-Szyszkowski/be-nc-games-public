const db = require("../db/connection");
const selectReviewsById = require(`./reviews-model`);

const selectComments = async (review_id) => {
  const rex = /^\d+$/g;
  if (!rex.test(review_id)) {
    return Promise.reject({
      status: 400,
      message: `Unfortunately ${review_id} is not a valid ID, please use an integer.`,
    });
  }
  const reviewWithIdRaw = await db.query(
    `SELECT * FROM reviews WHERE reviews.review_id = $1;`,
    [review_id]
  );
  if (!reviewWithIdRaw.rows.length) {
    return Promise.reject({
      status: 404,
      message: `Review ID ${review_id} does not exist in our database.`,
    });
  }
  return db.query(
    `SELECT * FROM comments 
  WHERE review_id = $1 
  ORDER BY created_at DESC;`,
    [review_id]
  );
};

const insertComments = async (review_id, username, comment_body, next) => {
  const rex = /^\d+$/g;
  if (!rex.test(review_id)) {
    return Promise.reject({
      status: 400,
      message: `Unfortunately ${review_id} is not a valid ID, please use an integer.`,
    });
  }
  const reviewWithIdRaw = await db.query(
    `SELECT * FROM reviews WHERE reviews.review_id = $1;`,
    [review_id]
  );
  if (!reviewWithIdRaw.rows.length) {
    return Promise.reject({
      status: 404,
      message: `Review ID ${review_id} does not exist in our database.`,
    });
  }
  if (!comment_body) {
    return Promise.reject({
      status: 400,
      message: `Cannot post. No comment content entered.`,
    });
  }

  return db
    .query(
      `INSERT INTO comments (author, review_id, body) 
  VALUES ($2, $1, $3) 
  RETURNING *;`,
      [review_id, username, comment_body]
    )
    .catch((err) => {
      if (err.code === `23503`) {
        return Promise.reject({
          status: 404,
          message: `User ${username} does not exist in our database. Please register first.`,
        });
      }
    });
};

module.exports = { selectComments, insertComments };
