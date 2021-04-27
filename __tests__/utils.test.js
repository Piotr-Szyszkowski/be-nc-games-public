const {
  prepareExistingReviewData,
  createRefObject,
} = require(`../db/utils/data-manipulation`);

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

const reviewArray = [
  {
    review_id: 1,
    title: "Culture a Love of Agriculture With Agricola",
    designer: "Uwe Rosenberg",
    owner: "tickle122",
    review_img_url:
      "https://images.pexels.com/photos/4917821/pexels-photo-4917821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    review_body:
      "You could sum up Agricola with the simple phrase 'Farmyeard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
    category: "strategy",
    created_at: 1610964020514,
    votes: 1,
  },
  {
    review_id: 2,
    title: "JengARRGGGH!",
    designer: "Leslie Scott",
    owner: "grumpy19",
    review_img_url:
      "https://images.pexels.com/photos/4009761/pexels-photo-4009761.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    review_body:
      "Few games are equiped to fill a player with such a defined sense of mild-peril, but a friendly game of Jenga will turn the mustn't-make-it-fall anxiety all the way up to 11! Fiddly fun for all the family, this game needs little explaination. Whether you're a player who chooses to play it safe, or one who lives life on the edge, eventually the removal of blocks will destabilise the tower and all your Jenga dreams come tumbling down.",
    category: "dexterity",
    created_at: 1610964101251,
    votes: 5,
  },
  {
    review_id: 3,
    title: "Karma Karma Chameleon",
    designer: "Rikki Tahta",
    owner: "happyamy2016",
    review_img_url:
      "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    review_body:
      "Try to trick your friends. If you find yourself being dealt the Chamelean card then the aim of the game is simple; blend in... Meanwhile the other players aim to be as vague as they can to not give the game away ",
    category: "hidden-roles",
    created_at: 1610964102151,
    votes: 5,
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
  it("should return an array of objects, each containing a review_img_url property", () => {
    const actual = prepareExistingReviewData(testReviewInputArray);
    actual.forEach((review) => {
      expect(review).toEqual(
        expect.objectContaining({
          title: expect.any(String),
          review_body: expect.any(String),
          review_img_url: expect.any(String),
          designer: expect.any(String),
          votes: expect.any(Number),
          category: expect.any(String),
          owner: expect.any(String),
          created_at: expect.any(String),
        })
      );
    });
  });
  it("should return an array of correctly formatted objects containing correct timestamp and url", () => {
    const actual = prepareExistingReviewData(testReviewInputArray);
    expect(actual[1]).toEqual({
      title: "Jenga",
      designer: "Leslie Scott",
      owner: "philippaclaire9",
      review_img_url:
        "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
      review_body: "Fiddly fun for all the family",
      category: "dexterity",
      created_at: new Date(1610964101251).toISOString(),
      votes: 5,
    });
  });
});
describe(`createRefObject`, () => {
  it("takes an array and returns an object", () => {
    const actual = createRefObject(reviewArray);
    expect(typeof actual).toBe("object");
    expect(actual).not.toBeInstanceOf(Array);
  });
});
