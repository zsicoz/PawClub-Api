var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var db = require("./DB");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT;


app.get('/', function (req,res) {
    res.send('Çalışıyor');
})

app.get("/UserCheck/:username/:password",db.UserCheck);
app.post("/UserAdd",db.UserAdd);






app.listen(port,(req,res) => console.log("Listening , Port : 3001"));