const endpoints = {};

endpoints[
  `/api`
] = `Main endpoint. Allowed methods: GET - responds with object describing all endpoints for API`;
endpoints[
  `/api/categories`
] = `Allowed methods: GET - responds with a 'categories' array of all categories objects present in database`;
endpoints[
  `/api/reviews`
] = `Allowed methods: GET - responds with a 'reviews' array of all reviews present in database`;
endpoints[
  `/api/reviews/:review_id`
] = `Allowed methods: GET - responds with review object of selected ID, PATCH - updates "votes" count on a review, and responds with that review object`;
endpoints[
  `/api/reviews/:review_id/comments`
] = `Allowed methods: GET - responds with comments array for given review ID, POST - allows adding new comment to existing review ID, responds with posted comment`;
console.log(endpoints);

module.exports = endpoints;
