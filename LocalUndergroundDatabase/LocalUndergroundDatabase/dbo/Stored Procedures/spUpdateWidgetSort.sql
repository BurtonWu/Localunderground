--create table PanelImage
--(
--	Id int primary key identity,
--	Name varchar(255),
--	Size int,
--	ImageData varbinary(max)
--)

CREATE PROC spUpdateWidgetSort
(
	@StoryBoardID INT,
	@WidgetSorts TVP_WidgetSort READONLY
)
AS 
BEGIN
	DECLARE @TextWidgetType INT = 1;
	DECLARE @ImageWidgetType INT = 2;

	BEGIN TRY
		BEGIN TRANSACTION
			DECLARE @Count1 INT = 0;
			DECLARE @Count2 INT = 0;

			SET @Count1 = (SELECT COUNT(*) FROM @WidgetSorts WS WHERE WS.WidgetType = @TextWidgetType)
			SET @Count2 = (SELECT COUNT(*) FROM @WidgetSorts WS
							INNER JOIN TextWidgetCore WC
								ON WS.ID = WC.ID 
								AND WS.WidgetType = @TextWidgetType 
								AND WC.StoryBoardID = @StoryBoardId);


			IF(@Count1 <> @Count2) 
				THROW 70000, 'Invalid text sort parameters', 1;

	
			SET @Count1 = (SELECT COUNT(*) FROM @WidgetSorts WS WHERE WS.WidgetType = @ImageWidgetType)
			SET @Count2 = (SELECT COUNT(*) FROM @WidgetSorts WS
							INNER JOIN ImageWidgetCore IWC
								ON WS.ID = IWC.ID 
								AND WS.WidgetType = @ImageWidgetType 
								AND IWC.StoryBoardID = @StoryBoardId);

			IF(@Count1 <> @Count2) 
				THROW 70000, 'Invalid image sort parameters', 1;

	
			UPDATE TextWidgetCore
				SET Sort = WC.Sort
			FROM
				TextWidgetCore TWC
				INNER JOIN @WidgetSorts WC
					ON TWC.ID = WC.ID AND WC.WidgetType = @TextWidgetType
			WHERE TWC.StoryBoardID = @StoryBoardId

			UPDATE ImageWidgetCore
				SET Sort = WC.Sort
			FROM
				ImageWidgetCore IWC
				INNER JOIN @WidgetSorts WC
					ON IWC.ID = WC.ID AND WC.WidgetType = @ImageWidgetType
			WHERE IWC.StoryBoardID = @StoryBoardId
		COMMIT TRANSACTION
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END