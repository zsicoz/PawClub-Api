var sql = require("mssql");
const nodemailer = require("nodemailer");
const config = {
  user: 'erkankrcr_SQLLogin_1',
  password: 'q9cer8gn5m',
  server: 'MSSQLIT5.mssql.somee.com', // You can use 'localhost\\instance' to connect to named instance
  database: 'MSSQLIT5'
}
let transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user: 'PawClubEmail@gmail.com', // generated ethereal user
    pass: '123zsicoz' // generated ethereal password
  }
});

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
    
    request.query('insert into tbl_Donate (Shelter_id,User_id,Donate_Date,Donate_Pay,Shelter_Ok) values ('+req.body.Shelter_id+','+req.body.User_id+',GETDATE(),'+req.body.Donate_pay+',0)',(err, recordset) => {
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

module.exports.AdminDonateList = function (req,res) {
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query("select S.id as tbl_Shelter_id, S.Shelter_Name, S.Shelter_Phone, S.Shelter_Province, D.id as id , D.Shelter_id , D.User_id , D.Donate_Date , D.Donate_Pay , D.Invoice , D.Shelter_Ok , D.Comment from tbl_Animal_Shelter S, tbl_donate D where D.Shelter_id = S.id and D.Shelter_Ok=1 and D.Admin_Ok=0", function (err, recordset) {
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

module.exports.ShelterDonateList = function (req,res) {
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query("select D.id as id , S.id as Shelter_id , U.id as User_id ,S.Shelter_name as Shelter_Name , U.Name_Surname as NameAndSurname , D.Donate_Date as Donate_Date , D.Donate_Pay as Donate_Pay , D.Invoice as Invoice , D.Shelter_Ok as Shelter_Ok , D.Comment as Comment  from tbl_user U, tbl_donate D , tbl_Animal_Shelter S where U.id=D.User_id and D.Shelter_id=S.id and D.Shelter_Ok=0 and D.Shelter_id="+req.params.id, function (err, recordset) {
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

module.exports.ShelterDonateInfo = function (req,res) {
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    debugger;
    request.query("update tbl_donate set Invoice ='"+req.body.Info+"', Shelter_Ok=1 , Admin_Ok=0 where id ="+req.body.id, function (err, recordset) {
      if (err){
        res.send(err)
        debugger;
      } 
      sql.close();
      debugger;
      res.send("Bilgiler Güncellendi");
    });
  });
}


module.exports.AdminDonateInfo = function (req,res) {
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    debugger;
    if(req.body.success == 'true' ){
      request.query("update tbl_donate set Admin_Ok=1 , Comment='Başarılı Bir Şekilde Tamamlandı' where id ="+req.body.id, function (err) {
        if (err){
          res.send(err)
          debugger;
        } 
        debugger;
        request.query("select U.Name_Surname as Name_Surname, U.Email as Email, S.Shelter_Name as Shelter_Name , D.Donate_Pay , D.Invoice as Invoice from tbl_user U , tbl_donate D , tbl_Animal_Shelter S where U.id=D.User_id and S.id=D.Shelter_id and D.id="+req.body.id, function (err, recordset) {
        if(err) console.log(err);
        debugger;
        var user = recordset.recordset[0];
        debugger;
      
        var mailOptions = {
          from: 'PawClubEmail@gmail.com',
          to: user.Email,
          subject: 'Bağışınız için Teşekkür ederiz',
          text: "Merhaba '"+user.Name_Surname+"' , '"+user.Shelter_Name+"' 'na yaptığınız '"+ user.Donate_Pay +"' Lira bağıştan dolayı teşekkür ederiz. '"+user.Shelter_Name+"' 'in Bağış miktarı ile yaptıkları : '"+user.Invoice+"'."
          // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
            res.send(error);
          } else {
            console.log('Email sent: ' + info.response);
            res.send('Onaylandı ve Dekont Gönderildi');
          }
          
        });
      });
    });
    }else{
      request.query("update tbl_donate set Admin_Ok=0, Shelter_Ok=0 , Comment='Kurumun Açıklaması Onaylanmadı' where id ="+req.body.id, function (err, recordset) {
        if (err){
          res.send(err)
          debugger;
        } 
        sql.close();
        debugger;
        res.send("Onay Verilmedi Kuruma Tekrardan Gönderildi");
      });
    }
  });
}



//http://localhost:3001/UserCheck/zsicoz/123zehra



/*

var mailOptions = {
  from: 'PawClubEmail@gmail.com',
  to: 'erkankrcr863@gmail.com',
  subject: 'Sending Email using Node.js',
  text: `Hi Smartherd, thank you for your nice Node.js tutorials.
          I will donate 50$ for this course. Please send me payment options.`
  // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
  */