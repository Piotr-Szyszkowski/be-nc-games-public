// extract any functions you are using to manipulate your data, into this file
const today = new Date();
const time =
  today.getFullYear() +
  ":" +
  (today.getMonth() + 1) +
  ":" +
  today.getDate() +
  ":" +
  today.getHours() +
  ":" +
  today.getMinutes() +
  ":" +
  today.getSeconds();
console.log(time);

const returnNewTimestamp = () => {
  const number = 788918400;
  const timestamp = new Date(number).toISOString();
  console.log(timestamp);
};
