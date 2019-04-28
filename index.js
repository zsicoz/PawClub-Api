var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var db = require("./DB");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3001;




app.get("/UserCheck/:email/:password",db.UserCheck);
app.get("/UserAdd/:name_surname/:email/:password/:user_type",db.UserAdd);






app.listen(port,(req,res) => console.log("Listening , Port : 3001"));