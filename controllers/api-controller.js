const sendHelloFromApi = (request, response, next) => {
  response.status(200).send({ message: "Hello from the api" });
};

module.exports = sendHelloFromApi;
