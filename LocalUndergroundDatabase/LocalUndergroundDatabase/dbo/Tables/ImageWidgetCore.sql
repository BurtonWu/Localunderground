CREATE TABLE [dbo].[ImageWidgetCore] (
    [ID]           INT      IDENTITY (1, 1) NOT NULL,
    [StoryBoardID] INT      NOT NULL,
    [Sort]         INT      NULL,
    [CreatedOn]    DATETIME NOT NULL,
    [ModifiedOn]   DATETIME NOT NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC),
    FOREIGN KEY ([StoryBoardID]) REFERENCES [dbo].[StoryBoardCore] ([ID])
);



