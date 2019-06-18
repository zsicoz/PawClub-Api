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

select * from tbl_donate
select * from tbl_user
select * from tbl_Animal_Shelter
select * from tbl_donate

insert into tbl_user (Name_Surname,Email,[Password],User_Type,UserName,ShelterId)  values ('Kavacık-Hayvan-Barinagi','animalshelter@kavacik.bel.tr','123kavacik','S','kavacikshelter',17) 
update tbl_user set email='zsicoz@st.medipol.edu.tr'  where id=14
alter table tbl_donate add Admin_Ok bit
SELECT * from tbl_user
delete from tbl_user where id=28
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




select S.id as tbl_Shelter_id, S.Shelter_Name, S.Shelter_Phone, S.Shelter_Province, D.id as Donate_id , D.Shelter_id , D.User_id , D.Donate_Date , D.Donate_Pay , D.Invoice , D.Shelter_Ok , D.Comment from tbl_Animal_Shelter S, tbl_donate D where D.Shelter_id = S.id

select D.id as id , S.id as Shelter_id , U.id as User_id , U.Name_Surname as NameAndSurname , D.Donate_Date as Donate_Date , D.Donate_Pay as Donate_Pay , D.Invoice as Invoice , D.Shelter_Ok as Shelter_Ok , D.Comment as Comment  from tbl_user U, tbl_donate D , tbl_Animal_Shelter S where U.id=D.User_id and D.Shelter_id=S.id and D.Shelter_id=18