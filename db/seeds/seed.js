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
      const insertReviewQueryStr = format(
        `INSERT INTO reviews (title, review_body, designer, votes, category, owner) VALUES %L RETURNING *;`,
        [["title", "d", "h", 3, "dexterity", "tickle122"]]
      );
      return db.query(insertReviewQueryStr);
    });
};

module.exports = seed;
