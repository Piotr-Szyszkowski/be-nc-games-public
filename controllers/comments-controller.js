const { selectComments, insertComments } = require("../models/comments-model");
const { selectReviewsById } = require(`../models/reviews-model`);

const getComments = async (request, response, next) => {
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

const postComments = async (request, response, next) => {
  const { review_id } = request.params;
  const { username, comment_body } = request.body;
  const addedCommentRaw = await insertComments(
    review_id,
    username,
    comment_body
  );
  const comment = addedCommentRaw.rows[0];
  response.status(201).send({ comment });
};

module.exports = { getComments, postComments };
