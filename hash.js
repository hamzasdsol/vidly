const bcrypt = require("bcrypt");

async function run(value) {
  console.log("Original password : " + value);
  let salt = await bcrypt.genSalt(10);
  console.log(salt);
  const hashedPassword = await bcrypt.hash(value, salt);
  console.log("Hashed password : " + hashedPassword);
}

function getCurrentDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + "-" + mm + "-" + yyyy;

  return today;
}

// run("123456");
const today = getCurrentDate();
console.log(today);
