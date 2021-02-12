import { WidgetType } from "./widget.models";

export interface WidgetSortParams {
    storyBoardId: number;
    widgetSortModels: WidgetSortModel[];
}

export interface WidgetSortModel {
    id: number;
    widgetType: number;
    sort: number;
}

export interface WidgetDeleteParams {
    widgetId: number;
    storyBoardId: number;
    widgetType: WidgetType;
}

export interface Widget {
    id?: number;
    storyBoardId: number;
    sort: number;
    widgetType: number;
}