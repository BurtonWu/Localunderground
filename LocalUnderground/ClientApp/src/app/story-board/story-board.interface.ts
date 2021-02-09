
export interface StoryBoardModel {
    id: number;
    title: string;
    synopsis: string;
    //widgets
    // textWidgetModels: TextWidgetModel[];
    // imageWidgets: any;
    // soundWidgets: any;

    // cover: FormData;
}

export interface StoryboardCreateRequestParams {
    title: string
    synopsis: string;
}

export interface StoryboardUpdateParams {
    id: number;
    title: string;
    synopsis: string;

    // textModels: TextWidgetModel[];
}

export interface StoryBoardCore {
    id: number;
    title: string;
    synopsis: string;
}