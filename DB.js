var sql = require("mssql");
const config = {
  user: 'erkankrcr_SQLLogin_1',
  password: 'q9cer8gn5m',
  server: 'MSSQLIT5.mssql.somee.com', // You can use 'localhost\\instance' to connect to named instance
  database: 'MSSQLIT5'
}

module.exports.UserCheck = function (req,res) {
  sql.connect(config, function (err) {
    if (err) console.log(err);
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
        console.log(err)
        res.send(err)
      } 
      sql.close();
      res.send("Kayıt Tamamlandı");
    });
  });
}


//http://localhost:3001/UserCheck/zsicoz/123zehra