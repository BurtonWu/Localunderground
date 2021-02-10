import { TextWidgetModel } from "../widget/text-widget/text-widget.interface";
import { ImageWidgetModel } from "../widget/image-widget/image-widget.interface";

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


export interface StoryBoardViewModel {
    id: number;
    title: string;
    synopsis: string;
    coverPortrait: string;
    //widgets
    textWidgetModels: TextWidgetModel[];
    imageWidgets: ImageWidgetModel[];
    // soundWidgets: any;

}

export interface StoryboardCreateRequestParams {
    title: string
    synopsis: string;
    coverPortrait: string;
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