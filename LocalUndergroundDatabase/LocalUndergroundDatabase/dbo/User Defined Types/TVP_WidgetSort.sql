CREATE TYPE [dbo].[TVP_WidgetSort] AS TABLE (
    [ID]         INT NOT NULL,
    [Sort]       INT NOT NULL,
    [WidgetType] INT NOT NULL,
    PRIMARY KEY CLUSTERED ([ID] ASC));

