const { dropTables, createTables } = require("../manage-tables");
const format = require("pg-format");
const db = require("../connection");
const { prepareExistingReviewData } = require("../utils/data-manipulation");

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
      const updatedReviewData = prepareExistingReviewData(newReviewData);
      const insertReviewQueryStr = format(
        `INSERT INTO reviews 
        (title, review_body, designer, votes, category, owner, created_at, review_img_url) 
        VALUES %L RETURNING *;`,
        updatedReviewData.map(
          ({
            title,
            review_body,
            designer,
            votes,
            category,
            owner,
            created_at,
            review_img_url,
          }) => {
            return [
              title,
              review_body,
              designer,
              votes,
              category,
              owner,
              created_at,
              review_img_url,
            ];
          }
        )
      );
      return db.query(insertReviewQueryStr);
    })
    .then((x) => {
      console.log(x);
    });
};

module.exports = seed;
