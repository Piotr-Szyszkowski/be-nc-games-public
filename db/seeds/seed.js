const { dropTables, createTables } = require("../manage-tables");
const format = require("pg-format");
const db = require("../connection");
const seed = function ({ categoryData, commentData, reviewData, userData }) {
  return dropTables()
    .then(() => {
      return createTables();
    })
    .then(() => {
      const insertCategoryQueryStr = format(
        `INSERT INTO categories (slug, description) VALUES %L RETURNING *;`,
        categoryData.map(({ slug, description }) => {
          return [slug, description];
        })
      );
      return db.query(insertCategoryQueryStr);
    })
    .then(() => {
      const insertUserQueryStr = format(
        `INSERT INTO users (username, avatar_url, name) VALUES %L RETURNING *;`,
        userData.map(({ username, avatar_url, name }) => {
          return [username, avatar_url, name];
        })
      );
      return db.query(insertUserQueryStr);
    })
    .then(() => {
      const newReviewData = [...reviewData];
      return prepareReviewData(newReviewData);
      newReviewData.forEach((obj) => {
        if (typeof obj.created_at === "number") {
          const timestamp = new Date(obj.created_at).toISOString();
          obj.created_at = timestamp;
        } else {
          const today = new Date();
          obj.created_at = today;
        }
      });
      console.log(newReviewData); // logs with correct times
      const insertReviewQueryStr = format(
        `INSERT INTO reviews (title, review_body, designer, votes, category, owner, created_at) VALUES %L RETURNING *;`,
        newReviewData.map(
          ({
            title,
            review_body,
            designer,
            votes,
            category,
            owner,
            created_at,
          }) => {
            return [
              title,
              review_body,
              designer,
              votes,
              category,
              owner,
              created_at,
            ];
          }
        )
      );
      return db.query(insertReviewQueryStr);
    });
};

module.exports = seed;
