CREATE TABLE [dbo].[StoryBoardCore] (
    [ID]       INT           IDENTITY (1, 1) NOT NULL,
    [UserID]   VARCHAR (255) NULL,
    [Title]    VARCHAR (255) NULL,
    [Synopsis] VARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC)
);

