import { Routes } from "@angular/router";
import { RoutePath } from "src/app/shared/shared.constants";
import { StoryBoardViewComponent } from "../story-board-view/story-board-view.component";
import { BillBoardComponent } from "./bill-board.component";

export const billBoardRoutes: Routes = [
    {
        path: RoutePath.BillBoard,
        component: BillBoardComponent
    },
    {
        path: RoutePath.StoryBoard_View,
        component: StoryBoardViewComponent
    }
];