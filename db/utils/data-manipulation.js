// extract any functions you are using to manipulate your data, into this file

const prepareExistingReviewData = (newReviewData) => {
  return newReviewData.map((obj) => {
    const timestamp = new Date(obj.created_at).toISOString();
    obj.created_at = timestamp;

    const defaultUrl =
      "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg";
    if (!obj.review_img_url) {
      obj.review_img_url = defaultUrl;
    }
    return obj;
  });
};

const createRefObject = (reviewArray) => {
  const lookUp = {};
  reviewArray.forEach((reviewObj) => {
    const reviewTitle = reviewObj.title;
    const reviewId = reviewObj.review_id;
    lookUp[reviewTitle] = reviewId;
  });
  return lookUp;
};

const swapTitleWithId = (refObject, commentData) => {
  const swapSingleTitleWithId = (singleCommentObj) => {
    const { belongs_to, created_at, ...restOfComment } = singleCommentObj;
    const id = refObject[belongs_to];
    const timeStamp = new Date(created_at).toISOString();
    const newCommentsObj = {
      review_id: id,
      created_at: timeStamp,
      ...restOfComment,
    };
    return newCommentsObj;
  };
  return commentData.map(swapSingleTitleWithId);
};

module.exports = {
  prepareExistingReviewData,
  createRefObject,
  swapTitleWithId,
};
