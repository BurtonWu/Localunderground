CREATE TABLE [dbo].[WidgetImage] (
    [ID]            INT             IDENTITY (1, 1) NOT NULL,
    [ImageWidgetID] INT             NOT NULL,
    [Sort]          INT             NULL,
    [Size]          INT             NULL,
    [ImageData]     VARBINARY (MAX) NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC),
    FOREIGN KEY ([ImageWidgetID]) REFERENCES [dbo].[ImageWidgetCore] ([ID])
);

