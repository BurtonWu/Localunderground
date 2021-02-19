CREATE TABLE [dbo].[StoryBoardCore] (
    [ID]            INT             IDENTITY (1, 1) NOT NULL,
    [UserID]        VARCHAR (255)   NULL,
    [Title]         VARCHAR (255)   NULL,
    [Synopsis]      VARCHAR (255)   NULL,
    [CoverPortrait] VARBINARY (MAX) NULL,
    [CreatedOn]     DATETIME        NOT NULL,
    [ModifiedOn]    DATETIME        NOT NULL,
    [CategoryId]    INT             NOT NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC),
    FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Category] ([ID])
);





