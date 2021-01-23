import { WidgetType } from "./widget.models";

export interface WidgetSortParams {
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