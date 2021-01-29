CREATE TABLE [dbo].[TextWidgetCore] (
    [ID]           INT           IDENTITY (1, 1) NOT NULL,
    [StoryBoardId] INT           NOT NULL,
    [Sort]         INT           NULL,
    [Body]         VARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC),
    FOREIGN KEY ([StoryBoardId]) REFERENCES [dbo].[StoryBoardCore] ([ID])
);

