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
    request.query("select * from tbl_user where Email='"+req.params.email+"' And Password='"+req.params.password+"'", function (err, recordset) {
      if (err) console.log(err)
      sql.close();
      if(!recordset.recordset == null){
      res.send(data);
      }else{
        res.send("404");
      }
    });
  });
}

module.exports.UserAdd = function (req,res) {
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query("insert into tbl_user values ('"+req.params.name_surname+"','"+req.params.email+"',"+req.params.password+"','"+req.params.user_type+"')", function (err, recordset) {
      if (err){
        console.log(err)
        res.send(err)
      } 
      sql.close();
      res.send("200");
    });
  });
}