--create table PanelImage
--(
--	Id int primary key identity,
--	Name varchar(255),
--	Size int,
--	ImageData varbinary(max)
--)

CREATE PROC spDeleteStoryBoard
(
	@StoryBoardID INT
)
AS 
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION

			DELETE FROM WidgetImage
			WHERE ImageWidgetID IN (
				SELECT IWC.ID FROM ImageWidgetCore IWC
				WHERE IWC.StoryBoardID = @StoryBoardID
			)

			DELETE FROM ImageWidgetCore
			WHERE StoryBoardID = @StoryBoardID

			DELETE FROM TextWidgetCore
			WHERE StoryBoardID = @StoryBoardID

			DELETE FROM StoryBoardCore
			WHERE ID = @StoryBoardID

		COMMIT TRANSACTION
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END