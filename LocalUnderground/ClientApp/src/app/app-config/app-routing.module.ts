import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from '../auth/auth-login.component';
import { AuthRegisterComponent } from '../auth/auth-register.component';
import { AuthorizationGuardService } from '../app-config/app-auth-guard.service';
import { RoutePath } from '../shared/shared.constants';
import { LayoutComponent } from '../layout/layout.component';
import { StoryBoardCreateComponent } from '../features/story-board-studio/story-board-create/story-board-create.component';



const routes: Routes = [
  //Authorized
  //redirect to, from nothing in url, '', to localhost:4200/storyboard
  { path: '', pathMatch: 'full', redirectTo: RoutePath.Main, canActivate: [AuthorizationGuardService] },
  { path: RoutePath.Main, component: LayoutComponent, canActivate: [AuthorizationGuardService] },
  { path: RoutePath.Studio, component: StoryBoardCreateComponent},
  { path: RoutePath.Studio_Create, component: StoryBoardCreateComponent, canActivate: [AuthorizationGuardService] },
  { path: RoutePath.Login, component: AuthLoginComponent },
  { path: RoutePath.Register, component: AuthRegisterComponent },

  //Unauthorized
  // { path: '', pathMatch: 'full', redirectTo: RoutePath.Main },
  // { path: RoutePath.Main, component: LayoutComponent},
  // { path: RoutePath.StoryBoard, component: StoryBoardComponent},
  // { path: RoutePath.StoryBoardCreate, component: StoryBoardCreateComponent},
  // { path: RoutePath.Login, component: AuthLoginComponent },
  // { path: RoutePath.Register, component: AuthRegisterComponent },

  // { path: 'user', component: AuthLoginComponent, 
  //     children: [
  //         { path: 'register', component: AuthRegisterComponent },
  //         { path: 'login', component: AuthLoginComponent }

  //     ]
  // }
    // { path: RoutePath.Billboard_Create, component: BillboardCreateComponent, canActivate: [AuthorizationGuardService] },
    // { path: RoutePath.Billboard, component: BillboardComponent, canActivate: [AuthorizationGuardService] },
    // { path: RoutePath.Panel_Create, component: PanelCreateComponent, canActivate: [AuthorizationGuardService] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})

export class AppRoutingModule {

}

