var sql = require("mssql");
const config = {
  user: 'erkankrcr_SQLLogin_1',
  password: 'q9cer8gn5m',
  server: 'MSSQLIT5.mssql.somee.com', // You can use 'localhost\\instance' to connect to named instance
  database: 'MSSQLIT5'
}

module.exports.UserCheck = function (req,res) {
  sql.connect(config, function (err) {
    if (err) console.log("UserCheck :"+err);
    var request = new sql.Request();
    request.query("select * from tbl_user where UserName='"+req.params.username+"' And Password='"+req.params.password+"'", function (err, recordset) {
      if (err) console.log("UserCheck :"+err)
      sql.close();
      if(!recordset.recordset == 'undefined'){
        console.log("UserCheck : Bulunamadı");
        res.send("Bulunamadı");
      }else{
        console.log("UserCheck :"+recordset.recordset[0]);
        res.send(recordset.recordset[0]);
      }
    });
  });
}

module.exports.UserAdd = function (req,res) {
  sql.connect(config, function (err) {
    if (err) console.log("UserAdd :"+err);
    var request = new sql.Request();
    request.query("insert into tbl_user (Name_Surname,Email,Password,User_Type,UserName) values ('"+req.body.name_surname+"','"+req.body.email+"','"+req.body.password+"','"+req.body.user_type+"','"+req.body.username+"')", function (err, recordset) {
      if (err){
        console.log("UserAdd :"+err)
        res.send(err)
      } 
      sql.close();
      console.log("UserAdd : Kayıt Tamamlandı :"+req.body);
      res.send("Kayıt Tamamlandı");
    });
  });
}

module.exports.ShelterList = function (req,res) {
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query("select * from tbl_Animal_Shelter where Shelter_Province ='"+req.params.Country+"'", function (err, recordset) {
      if (err){
        console.log("ShelterList : "+err)
        sql.close();
        res.send(err)
      }else if(recordset.recordset == 'undefined'){
        sql.close();
        console.log("ShelterList : Tabloda Veri Yok");
        res.send("Tabloda Veri Yok");
      }else{
        sql.close();
        console.log("ShelterList : "+recordset.recordset);
        res.send(recordset.recordset);
      }
    });
  });
}

module.exports.ShelterListCountry = function (req,res) {
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query("select Shelter_Province from tbl_Animal_Shelter order by Shelter_Province", function (err, recordset) {
      if (err){
        console.log("ShelterListCountry : "+err)
        sql.close();
        res.send(err)
      }else if(recordset.recordset == 'undefined'){
        sql.close();
        console.log("ShelterListCountry : Tabloda Veri Yok");
        res.send("Tabloda Veri Yok");
      }else{
        sql.close();
        console.log("ShelterListCountry : "+recordset.recordset);
        res.send(recordset.recordset);
      }
    });
  });
}



//http://localhost:3001/UserCheck/zsicoz/123zehra