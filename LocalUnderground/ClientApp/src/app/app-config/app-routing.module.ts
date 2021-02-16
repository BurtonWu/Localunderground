import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from '../auth/auth-login.component';
import { AuthorizationGuardService } from '../app-config/app-auth-guard.service';
import { RoutePath } from '../shared/shared.constants';
import { authRoutes } from '../auth/auth.routes';
import { billBoardRoutes } from '../features/bill-board/core/bill-board.routes';
import { studioRoutes } from '../features/studio/core/studio.routes';



const routes: Routes = [
  //Authorized
  //redirect to, from nothing in url, '', to localhost:4200/storyboard
  // { path: '', pathMatch: 'full', redirectTo: RoutePath.BillBoard, canActivate: [AuthorizationGuardService] },
  ...authRoutes,
  ...billBoardRoutes,
  ...studioRoutes


  
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
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})

export class AppRoutingModule {

}

