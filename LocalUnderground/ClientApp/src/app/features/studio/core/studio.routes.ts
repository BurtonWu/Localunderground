import { Routes } from "@angular/router";
import { AuthorizationGuardService } from "src/app/app-config/app-auth-guard.service";
import { RoutePath } from "src/app/shared/shared.constants";
import { StoryBoardCreateComponent } from "../story-board-create/story-board-create.component";
import { StoryBoardEditComponent } from "../story-board-edit/story-board-edit.component";
import { StudioComponent } from "./studio.component";

export const studioRoutes: Routes = [
    {
        path: RoutePath.Studio,
        component: StudioComponent,
        canActivate: [AuthorizationGuardService],
    },
    {
        path: RoutePath.Studio_StoryBoard_Create,
        component: StoryBoardCreateComponent,
        canActivate: [AuthorizationGuardService]
    },
    {
        path: RoutePath.Studio_StoryBoard_Edit,
        component: StoryBoardEditComponent,
        canActivate: [AuthorizationGuardService]
    }
];