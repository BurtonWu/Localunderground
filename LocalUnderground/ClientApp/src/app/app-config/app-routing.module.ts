import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from '../auth/auth-login.component';
import { AuthRegisterComponent } from '../auth/auth-register.component';
import { AuthorizationGuardService } from '../app-config/app-auth-guard.service';
import { RoutePath } from '../shared/shared.constants';
import { LayoutComponent } from '../layout/layout.component';
import { StoryBoardCreateComponent } from '../story-board-create/story-board-create.component';



const routes: Routes = [
  //redirect to, from nothing in url, '', to localhost:4200/storyboard
  { path: '', pathMatch: 'full', redirectTo: RoutePath.Main, canActivate: [AuthorizationGuardService] },
    // { path: 'user', component: AuthLoginComponent, 
    //     children: [
    //         { path: 'register', component: AuthRegisterComponent },
    //         { path: 'login', component: AuthLoginComponent }

    //     ]
    // }
    { path: RoutePath.Main, component: LayoutComponent, canActivate: [AuthorizationGuardService] },
    { path: RoutePath.StoryBoardCreate, component: StoryBoardCreateComponent, canActivate: [AuthorizationGuardService] },

    { path: RoutePath.Login, component: AuthLoginComponent },
    { path: RoutePath.Register, component: AuthRegisterComponent },
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

