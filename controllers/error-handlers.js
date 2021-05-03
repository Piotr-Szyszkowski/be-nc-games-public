const handleRouteNotFound = (request, response, next) => {
  response
    .status(404)
    .send({ message: "This is not the route you want to follow" });
};

const handleInternalServerErrors = (err, request, response, next) => {
  response.status(500).send({ message: "Internal Server Error - Sorry Dude" });
};

const handleCustomErrors = (err, request, response, next) => {
  if (err.status && err.message) {
    response.status(err.status).send({ message: err.message });
  }
};

module.exports = {
  handleRouteNotFound,
  handleInternalServerErrors,
  handleCustomErrors,
};
