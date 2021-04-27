const { prepareExistingReviewData } = require(`../db/utils/data-manipulation`);

const testReviewInputArray = [
  {
    title: "Agricola",
    designer: "Uwe Rosenberg",
    owner: "mallionaire",
    review_body: "Farmyard fun!",
    category: "euro game",
    created_at: 1610964020514,
    votes: 1,
    review_img_url:
      "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
  },
  {
    title: "Jenga",
    designer: "Leslie Scott",
    owner: "philippaclaire9",
    review_body: "Fiddly fun for all the family",
    category: "dexterity",
    created_at: 1610964101251,
    votes: 5,
  },
  {
    title: "Ultimate Werewolf",
    designer: "Akihisa Okui",
    owner: "bainesface",
    review_body: "We couldn't find the werewolf!",
    category: "social deduction",
    created_at: 1610964101251,
    votes: 5,
    review_img_url:
      "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
  },
  {
    title: "Dolor reprehenderit",
    designer: "Gamey McGameface",
    owner: "mallionaire",
    review_body:
      "Consequat velit occaecat voluptate do. Dolor pariatur fugiat sint et proident ex do consequat est. Nisi minim laboris mollit cupidatat et adipisicing laborum do. Sint sit tempor officia pariatur duis ullamco labore ipsum nisi voluptate nulla eu veniam. Et do ad id dolore id cillum non non culpa. Cillum mollit dolor dolore excepteur aliquip. Cillum aliquip quis aute enim anim ex laborum officia. Aliqua magna elit reprehenderit Lorem elit non laboris irure qui aliquip ad proident. Qui enim mollit Lorem labore eiusmod",
    category: "social deduction",
    created_at: 1611315350936,
    votes: 7,
  },
];

describe(`prepareExistingReviewData()`, () => {
  it(`should return an array equal in length to input array`, () => {
    expect(prepareExistingReviewData(testReviewInputArray)).toBeInstanceOf(
      Array
    );
    expect(prepareExistingReviewData(testReviewInputArray).length).toEqual(
      testReviewInputArray.length
    );
  });
});
