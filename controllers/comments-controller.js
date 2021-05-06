const { selectComments, insertComments } = require("../models/comments-model");

const getComments = (request, response, next) => {
  const { review_id } = request.params;
  selectComments(review_id)
    .then((commentsFromQuery) => {
      if (!commentsFromQuery.rows.length) {
        return Promise.reject({
          status: 200,
          message: `Review ID ${review_id} does not have any comments yet.`,
        });
      }
      const comments = commentsFromQuery.rows;
      response.status(200).send({ comments });
    })
    .catch(next);
};

const postComments = (request, response, next) => {
  const { review_id } = request.params;
  const { username, comment_body } = request.body;

  insertComments(review_id, username, comment_body, next)
    .then((addedCommentRaw) => {
      const comment = addedCommentRaw.rows[0];
      response.status(201).send({ comment });
    })
    .catch(next);
};

module.exports = { getComments, postComments };
