var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var db = require("./DB");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3001;


app.get('/', function (req,res) {
    res.send('Çalışıyor');
})

app.get('/', function (req,res) {
    res.send('Bağlanıldı');
});
app.get("/UserCheck/:username/:password",db.UserCheck);
app.get('/ShelterList/:Country',db.ShelterList);
app.get('/ShelterListCountry',db.ShelterListCountry);
app.get('/UserDonateList/:id',db.UserDonateList);
app.get('/AdminDonateList',db.AdminDonateList);
app.get('/ShelterDonateList/:id',db.ShelterDonateList);

app.post('/UserUpdateInfo',db.UserUpdateInfo);
app.post('/UserDonateCreate',db.UserDonateCreate);
app.post("/UserAdd",db.UserAdd);
app.post('/ShelterDonateInfo',db.ShelterDonateInfo);
app.post('/AdminDonateInfo',db.AdminDonateInfo);







app.listen(port,(req,res) => console.log("Listening , Port :"+port));