export interface TextWidgetCreateParams {
    storyBoardId: number;
    sort: number;
}

export interface TextWidgetUpdateParams extends TextWidgetCreateParams {
    id: number;
    body: string;
}


export interface TextWidgetModel {
    storyBoardId?: number;
    id?: number;
    sort?: number;
    body: string;
}

