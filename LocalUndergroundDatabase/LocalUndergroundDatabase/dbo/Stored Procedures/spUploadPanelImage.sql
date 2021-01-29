--create table PanelImage
--(
--	Id int primary key identity,
--	Name varchar(255),
--	Size int,
--	ImageData varbinary(max)
--)

CREATE PROC [dbo].[spUploadPanelImage]
(
	@Name varchar(255),
	@Size int,
	@ImageData varbinary(max),
	@Id int output
)
as 
begin
	insert into PanelImage
	values (@Name, @Size, @ImageData)
	--The scope_identity() function returns the last identity created in the same session and the same scope.
	select @Id = SCOPE_IDENTITY()
end