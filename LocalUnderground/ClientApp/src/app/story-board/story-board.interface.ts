
export interface StoryboardModel {
    id: number;
    title: string;
    synopsis: string;
    //widgets
    textWidgetModels: TextWidgetModel[];
    // imageWidgets: any;
    // soundWidgets: any;

    // cover: FormData;
}

export interface StoryboardCreateRequestModel {
    title: string
    synopsis: string;
}

export interface StoryboardUpdateModel {
    Id: number;
    title: string;
    synopsis: string;

    textModels: TextWidgetModel[];
}

export interface StoryBoardCore {
    id: number;
    title: string;
    synopsis: string;
}

export interface TextWidgetModel {
    storyBoardId?: number;
    id?: number;
    sort?: number;
    body: string;
}