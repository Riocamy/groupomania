// Import mysql
const mysql = require("mysql")

// Configuration de la base de données mysql
const database = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : "S5efp!omRq!geJ9D",
  database : "groupomania"
});    

database.connect(function(err) {
  if (err) throw err;
  console.log("Server ok !");
});

module.exports.getDB = () => {
  return database
}