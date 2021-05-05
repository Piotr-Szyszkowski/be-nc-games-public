const db = require("../db/connection");

const selectComments = (review_id) => {
  return db.query(
    `SELECT * FROM comments 
  WHERE review_id = $1 
  ORDER BY created_at DESC;`,
    [review_id]
  );
};

const insertComments = (review_id, username, comment_body) => {
  return db.query(
    `INSERT INTO comments (author, review_id, body) 
  VALUES ($2, $1, $3) 
  RETURNING *;`,
    [review_id, username, comment_body]
  );
};

module.exports = { selectComments, insertComments };
