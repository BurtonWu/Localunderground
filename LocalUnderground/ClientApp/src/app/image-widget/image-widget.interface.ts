export interface ImageWidgetCreateParams {
    storyBoardId: number;
    sort: number;
    imageData: FormData;
}

export interface ImageWidgetUpdateParams {
    storyBoardId: number;
    id: number;
    sort: number;
    imageData: FormData;
}


export interface ImageWidgetModel {
    storyBoardId: number;
    id: number;
    sort: number;
    base64Image: string
}

