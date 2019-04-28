CREATE TABLE tbl_user (
id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
Name_Surname nvarchar(max)  NULL,
Email nvarchar(max)  NULL,
Password nvarchar(max)  NULL,
User_Type char(1)  NULL
);
GO
CREATE TABLE tbl_Animal_Shelter (
id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
Shelter_Name nvarchar(max)  NULL,
Shelter_Address nvarchar(max)  NULL,
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
