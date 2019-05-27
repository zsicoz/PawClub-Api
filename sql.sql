CREATE TABLE tbl_user (
id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
UserName nvarchar(max) NULL,
Name_Surname nvarchar(max)  NULL,
Email nvarchar(max)  NULL,
Password nvarchar(max)  NULL,
User_Type char(1)  NULL
);
GO
CREATE TABLE tbl_Animal_Shelter (
id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
Shelter_Name nvarchar  NULL,
Shelter_Address nvarchar NULL,
Shelter_Phone int  NULL,
Shelter_Province int  NULL
);
GO
CREATE TABLE tbl_donate (
id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
Shelter_id int NOT NULL REFERENCES tbl_Animal_Shelter(id),
User_id int NOT NULL REFERENCES tbl_user(id) ,
Donate_Date date NUll,
Donate_Pay money Null,
Invoice nvarchar(max) NULL,
Shelter_Ok bit NULL,
Comment nvarchar(max) Null,
);
GO


select * from tbl_user
select * from tbl_Animal_Shelter
select * from tbl_donate

insert into tbl_Animal_Shelter  values ('Kavacık Hayvan Barınağı','02178761232','Kavacık/Istanbul','Istanbul')
alter table tbl_user add ProfilePhoto NVARCHAR(max)
SELECT * from tbl_user
delete from tbl_user where id = 13
EXEC sp_rename ‘TabloAdi.KolonAdi’, ‘YeniKolonAdi’, ‘COLUMN’;

SELECT DATA_TYPE 
FROM INFORMATION_SCHEMA.COLUMNS
WHERE 
     TABLE_NAME = 'tbl_user' AND 
     COLUMN_NAME = 'ProfilePhoto'

     SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    CHARACTER_OCTET_LENGTH
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'tbl_user';


update tbl_user set Name_Surname='Erkan-Karacar',Email='erkan@gmail.com',Password='456erkan',UserName='erkankrcr',ProfilePhoto='asdasdasd' where UserName ='erkankrcr'



select Shelter_Province from tbl_Animal_Shelter GROUP by Shelter_Province

insert into tbl_Donate (Shelter_id,User_id,Donate_Date,Donate_Pay) values (13,2,GETDATE(),50)

select S.id as tbl_Shelter_id, S.Shelter_Name, S.Shelter_Phone, S.Shelter_Province, D.id as Donate_id , D.Shelter_id , D.User_id ,CONVERT(VARCHAR(10), D.Donate_Date, 101) AS D.Donate_Date , D.Donate_Pay , D.Invoice , D.Shelter_Ok , D.Comment from tbl_Animal_Shelter S, tbl_donate D where D.Shelter_id = S.id and D.User_id = 21