--create table PanelImage
--(
--	Id int primary key identity,
--	Name varchar(255),
--	Size int,
--	ImageData varbinary(max)
--)

CREATE PROC [dbo].[spGetPanelImages]
AS
BEGIN
	SELECT PI.Name, PI.ImageData FROM PanelImage PI

END