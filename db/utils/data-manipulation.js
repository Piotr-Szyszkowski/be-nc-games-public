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
