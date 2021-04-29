const db = require(`../db/connection`);
const app = require("../app.js");
const request = require("supertest");
const testData = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
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
              review_body: expect.any(String),
              designer: expect.any(String),
              review_img_url: expect.any(String),
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
});
