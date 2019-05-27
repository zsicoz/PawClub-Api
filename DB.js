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
      if (err) console.log(err)
      sql.close();
      if(!recordset.recordset == 'undefined'){
        res.send("Bulunamadı");
      }else{
        res.send(recordset.recordset[0]);
      }
    });
  });
}

module.exports.UserAdd = function (req,res) {
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query("insert into tbl_user (Name_Surname,Email,Password,User_Type,UserName) values ('"+req.body.name_surname+"','"+req.body.email+"','"+req.body.password+"','"+req.body.user_type+"','"+req.body.username+"')", function (err, recordset) {
      if (err){
        res.send(err)
      } 
      sql.close();
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
        sql.close();
        res.send(err)
      }else if(recordset.recordset == 'undefined'){
        sql.close();
        res.send("Tabloda Veri Yok");
      }else{
        sql.close();
        res.send({ShelterList:recordset.recordset});
      }
    });
  });
}

module.exports.ShelterListCountry = function (req,res) {
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query("select Shelter_Province from tbl_Animal_Shelter GROUP by Shelter_Province", function (err, recordset) {
      if (err){
        console.log(err)
        res.send(err)
      }else if(recordset.recordset == 'undefined'){
        res.send("Tabloda Veri Yok");
      }else{
        res.send({CountryList:recordset.recordset});
      }
      sql.close();
    });
  });
}

module.exports.UserUpdateInfo = function (req,res) {
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query("update tbl_user set Name_Surname='"+req.body.name_surname+"',Email='"+req.body.email+"',Password='"+req.body.password+"',UserName='"+req.body.username+"',ProfilePhoto='"+req.body.profilephoto+"' where UserName = '"+req.body.oldusername+"'", function (err, recordset) {
      if (err){
        res.send(err)
      } 
      sql.close();
      debugger;
      res.send("Bilgiler Güncellendi");
    });
  });
}

module.exports.UserDonateCreate = function (req,res) {
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    
    request.query('insert into tbl_Donate (Shelter_id,User_id,Donate_Date,Donate_Pay) values ('+req.body.Shelter_id+','+req.body.User_id+',GETDATE(),'+req.body.Donate_pay+')',(err, recordset) => {
      if (err){
        res.send(err)
      } 
      sql.close();
      
      res.end("Tamamlandı");
    });
  });
}

module.exports.UserDonateList = function (req,res) {
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query("select S.id as tbl_Shelter_id, S.Shelter_Name, S.Shelter_Phone, S.Shelter_Province, D.id as Donate_id , D.Shelter_id , D.User_id , D.Donate_Date , D.Donate_Pay , D.Invoice , D.Shelter_Ok , D.Comment from tbl_Animal_Shelter S, tbl_donate D where D.Shelter_id = S.id and D.User_id ="+req.params.id, function (err, recordset) {
      if (err){
        console.log(err)
        res.send(err)
      }else if(recordset.recordset == 'undefined'){
        res.send("Tabloda Veri Yok");
      }else{
        res.send({DonateArrayList:recordset.recordset});
      }
      sql.close();
    });
  });
}



//http://localhost:3001/UserCheck/zsicoz/123zehra