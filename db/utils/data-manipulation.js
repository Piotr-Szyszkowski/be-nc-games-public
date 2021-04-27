// extract any functions you are using to manipulate your data, into this file

const returnNewTimestamp = () => {
  const number = 788918400;
  const timestamp = new Date(number).toISOString();
  console.log(timestamp);
};

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

module.exports = { prepareExistingReviewData };
