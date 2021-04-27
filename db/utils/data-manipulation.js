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
  return {};
};

// const prepareReviewData = (newReviewData) => {
//   newReviewData.forEach((obj) => {
//     if (typeof obj.created_at === "number") {
//       const timestamp = new Date(obj.created_at).toISOString();
//       obj.created_at = timestamp;
//     } else {
//       const today = new Date();
//       obj.created_at = today;
//     }
//   });
// };

module.exports = { prepareExistingReviewData, createRefObject };
