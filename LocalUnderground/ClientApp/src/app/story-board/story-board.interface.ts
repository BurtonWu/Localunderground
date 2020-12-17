
export interface StoryBoardModel {
    title: string;
    synopsis: string;
    //widgets
    textModels: TextWidgetModel[];
    imageWidgets: any;
    soundWidgets: any;

    cover: FormData;
}

export interface StoryBoardCreateRequestModel {
    title: string
    synopsis: string;
}

export interface StoryBoardCore {
    id: number;
    title: string;
    synopsis: string;
}

export interface TextWidgetModel {
    id?: number;
    sort?: number;
    storyBoardId?: number;
    body: string;
}