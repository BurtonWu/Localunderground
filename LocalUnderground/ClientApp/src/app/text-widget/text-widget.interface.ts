import { Widget } from "../widget/widget.interface";

export interface TextWidgetCreateParams {
    storyBoardId: number;
    sort: number;
}

export interface TextWidgetUpdateParams {
    storyBoardId?: number;
    id: number;
    sort: number;
    body: string;
}


export interface TextWidgetModel extends Widget {
    body: string;
}

