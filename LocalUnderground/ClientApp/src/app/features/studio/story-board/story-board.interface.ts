import { Category } from "src/app/shared/shared.interface";

export interface StoryBoardModel {
    id: number;
    title: string;
    synopsis: string;
    category: Category;
    //widgets
    // textWidgetModels: TextWidgetModel[];
    // imageWidgets: any;
    // soundWidgets: any;

    // cover: FormData;
}

export interface StoryboardCreateRequestParams {
    title: string
    synopsis: string;
    coverPortrait: string;
    categoryId: number;
}

export interface StoryboardUpdateParams {
    id: number;
    title: string;
    synopsis: string;
    categoryId: number;
    // textModels: TextWidgetModel[];
}

export interface StoryBoardCore {
    id: number;
    title: string;
    synopsis: string;
}