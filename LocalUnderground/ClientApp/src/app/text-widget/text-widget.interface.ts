export interface TextWidgetCreateParams {
    storyBoardId: number;
    sort: number;
}

export interface TextWidgetUpdateParams extends TextWidgetCreateParams {
    id: number;
    body: string;
}
