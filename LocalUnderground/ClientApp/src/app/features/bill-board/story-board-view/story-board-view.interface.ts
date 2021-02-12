import { ImageWidgetModel } from "../../widget/image-widget/image-widget.interface";
import { TextWidgetModel } from "../../widget/text-widget/text-widget.interface";


export interface StoryBoardViewModel {
    id: number;
    title: string;
    synopsis: string;
    coverPortrait: string;
    //widgets
    textWidgetModels: TextWidgetModel[];
    imageWidgetModels: ImageWidgetModel[];
    // soundWidgets: any;

}

export interface StoryBoardEditModel {
    id: number;
    title: string;
    synopsis: string;
    coverPortrait: string;
    //widgets
    textWidgetModels: TextWidgetModel[];
    imageWidgetModels: ImageWidgetModel[];
    // soundWidgets: any;

}

export interface StoryboardCreateRequestParams {
    title: string
    synopsis: string;
    coverPortrait: string;
}
