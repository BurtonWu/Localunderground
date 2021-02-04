export interface ImageWidgetCreateParams {
    storyBoardId: number;
    sort: number;
    imageData: Base64ImageData[];
}

export interface ImageWidgetUpdateParams {
    storyBoardId: number;
    id: number;
    sort: number;
    imageData: Base64ImageData[];
}


export interface ImageWidgetModel {
    storyBoardId: number;
    id: number;
    sort: number;
    imageData: Base64ImageData[]
}

export interface Base64ImageData {
    base64ImageData: string;
    sort: number;
}