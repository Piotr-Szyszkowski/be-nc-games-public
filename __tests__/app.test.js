const db = require(`../db/connection`);
const app = require("../app.js");
const request = require("supertest");
const testData = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const { response } = require("express");
beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe(`GET /api`, () => {
  it(`responds with status:200 and a JSON object`, () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        expect(response.body.message).toEqual("Hello from the api");
      });
  });
});

describe(`GET /api/categories`, () => {
  it(`returns status: 200, responds with a 'categories' array of all categories objects`, () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((response) => {
        expect(response.body.categories).toBeInstanceOf(Array);
        expect(response.body.categories).toHaveLength(4);
      });
  });
  it(`responds with an array of objects displaying required properties`, () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((response) => {
        const categoriesArray = response.body.categories;
        categoriesArray.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
  it(`responds with an array of correct objects`, () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((response) => {
        expect(response.body.categories[2]).toEqual({
          slug: "dexterity",
          description: "Games involving physical skill",
        });
      });
  });
});
describe(`GET /api/reviews`, () => {
  it(`status:200, responds with arrray of review object, each which should have
      the following properties: owner which is the username from the users table, 
      title, review_id, review_body, designer, review_img_url, category, created_at,
      votes`, () => {
    return request(app)
      .get(`/api/reviews`)
      .expect(200)
      .then((response) => {
        const returnedAllReviewArray = response.body.reviews;
        expect(returnedAllReviewArray).toBeInstanceOf(Array);
        expect(returnedAllReviewArray).toHaveLength(13);
        returnedAllReviewArray.forEach((review) => {
          expect(review).toEqual(
            expect.objectContaining({
              owner: expect.any(String),
              title: expect.any(String),
              review_id: expect.any(Number),
              designer: expect.any(String),
              category: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
            })
          );
        });
      });
  });
  it(`status:200, responds with arrray of review object, each which should have
      comment_count property`, () => {
    return request(app)
      .get(`/api/reviews`)
      .expect(200)
      .then((response) => {
        const returnedAllReviewArray = response.body.reviews;
        returnedAllReviewArray.forEach((review) => {
          expect(review).toHaveProperty(`comment_count`);
          expect(review.comment_count).not.toBe(undefined);
        });

        expect(returnedAllReviewArray[4].comment_count).toBe(`3`);
      });
  });
  it(`response array by default is sorted descending by date - "created_at"`, () => {
    return request(app)
      .get(`/api/reviews`)
      .expect(200)
      .then((response) => {
        const returnedAllReviewArray = response.body.reviews;
        expect(returnedAllReviewArray).toBeSortedBy(`created_at`, {
          descending: true,
        });
      });
  });
  it(`test 1 - should accept a "sort_by" query`, () => {
    return request(app)
      .get(`/api/reviews?sort_by=designer`)
      .expect(200)
      .then((response) => {
        const returnedAllReviewArray = response.body.reviews;
        expect(returnedAllReviewArray).toBeSortedBy(`designer`, {
          descending: true,
        });
      });
  });
  it(`test 2 - should accept a "sort_by" query`, () => {
    return request(app)
      .get(`/api/reviews?sort_by=votes`)
      .expect(200)
      .then((response) => {
        const returnedAllReviewArray = response.body.reviews;
        expect(returnedAllReviewArray).toBeSortedBy(`votes`, {
          descending: true,
        });
      });
  });
  it(`should accept an "order" query, determining ascending
      or descending sorting`, () => {
    return request(app)
      .get(`/api/reviews?order=asc`)
      .expect(200)
      .then((response) => {
        const returnedAllReviewArray = response.body.reviews;
        expect(returnedAllReviewArray).toBeSortedBy(`created_at`, {
          descending: false,
        });
      });
  });
  it(`should accept combined "sort_by" and "order" queries`, () => {
    return request(app)
      .get(`/api/reviews?sort_by=designer&order=asc`)
      .expect(200)
      .then((response) => {
        const returnedAllReviewArray = response.body.reviews;
        expect(returnedAllReviewArray).toBeSortedBy(`designer`, {
          descending: false,
        });
      });
  });
  it(`should accept category query, that would only allow display of given
      game category`, () => {
    return request(app)
      .get(`/api/reviews?category=social deduction`)
      .expect(200)
      .then((response) => {
        const returnedAllReviewArray = response.body.reviews;
        expect(returnedAllReviewArray).toHaveLength(11);
        returnedAllReviewArray.forEach((review) => {
          expect(review.category).toBe(`social deduction`);
        });
      });
  });
  it(`should accept combined "category", "sort_by" and "order" queries`, () => {
    return request(app)
      .get(`/api/reviews?category=social deduction&sort_by=designer&order=asc`)
      .expect(200)
      .then((response) => {
        const returnedAllReviewArray = response.body.reviews;
        expect(returnedAllReviewArray).toHaveLength(11);
        returnedAllReviewArray.forEach((review) => {
          expect(review.category).toBe(`social deduction`);
          expect(returnedAllReviewArray).toBeSortedBy(`designer`, {
            descending: false,
          });
        });
      });
  });
});

describe(`GET /api/reviews/:review_id`, () => {
  it(`status: 200, responds with a review object with requested ID and he following properties: owner which is 
      the username from the users table, title, review_id, review_body, designer, review_img_url, 
      category, created_at, votes, comment_count which is the total count of all the comments with 
      this review_id`, () => {
    return request(app)
      .get(`/api/reviews/2`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          review: {
            review_id: 2,
            title: "Jenga",
            designer: "Leslie Scott",
            owner: "philippaclaire9",
            review_body: "Fiddly fun for all the family",
            category: "dexterity",
            created_at: `2021-01-18T10:01:41.251Z`,
            votes: 5,
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            comment_count: "3",
          },
        });
      });
  });
});

describe(`ERRORS: Non-existant routes`, () => {
  it(`Test 1 - GET /csi --> status 404 and message`, () => {
    return request(app)
      .get(`/csi`)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe(
          "This is not the route you want to follow"
        );
      });
  });
  it(`Test 2 - GET /api/sthelse --> status 404 and message`, () => {
    return request(app)
      .get(`/api/sthelse`)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe(
          "This is not the route you want to follow"
        );
      });
  });
});

describe(`ERRORS: GET /api/reviews`, () => {
  it(`status: 400 and message if passed an invalid sort_by query`, () => {
    const invSort = `horsepower`;
    return request(app)
      .get(`/api/reviews?sort_by=${invSort}`)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe(
          `You cannot sort reviews by ${invSort}!!`
        );
      });
  });
  it(`status: 400 and message if passed an invalid order query`, () => {
    const invOrder = `ascending`;
    return request(app)
      .get(`/api/reviews?order=${invOrder}`)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe(
          `Invalid <order> format. Please enter <asc> for ascending, or <desc> for descending.`
        );
      });
  });
  it(`status: 404 and message if passed category that does not exist in database`, () => {
    const nonexistantCategory = `VR Puzzle Simulation with Samurai Swords`;
    return request(app)
      .get(`/api/reviews?category=${nonexistantCategory}`)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe(
          `Category ${nonexistantCategory} does not exist in our database. Please try another one.`
        );
      });
  });
  it(`status: 404 and message if passed category that exists but does not match any reviews`, () => {
    const noMatchCategory = `children's games`;
    return request(app)
      .get(`/api/reviews?category=${noMatchCategory}`)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe(
          `Category ${noMatchCategory} does not match any reviews in our database. Please try another one.`
        );
      });
  });
});

// expect.objectContaining({
//   owner: expect.any(String),
//   title: expect.any(String),
//   review_id: expect.any(Number),
//   review_body: expect.any(String),
//   designer: expect.any(String),
//   review_img_url: expect.any(String),
//   category: expect.any(String),
//   created_at: expect.any(String),
//   votes: expect.any(Number),
// })   <-- for laters
