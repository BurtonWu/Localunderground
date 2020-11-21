import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from '../auth/auth-login.component';
import { AuthRegisterComponent } from '../auth/auth-register.component';
import { PanelComponent } from '../panel/panel.component';
import { PanelCreateComponent } from '../panel/panel-create.component';

import { AuthorizationGuardService } from '../app-config/app-auth-guard.service';
import { BillboardComponent } from '../billboard/billboard.component';
import { RoutePath } from '../shared/shared.constants';
import { BillboardCreateComponent } from '../billboard/billboard-create/billboard-create.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'billboard', canActivate: [AuthorizationGuardService] },
    // { path: 'user', component: AuthLoginComponent, 
    //     children: [
    //         { path: 'register', component: AuthRegisterComponent },
    //         { path: 'login', component: AuthLoginComponent }

    //     ]
    // }
    { path: RoutePath.Login, component: AuthLoginComponent },
    { path: RoutePath.Register, component: AuthRegisterComponent },
    { path: RoutePath.Billboard_Create, component: BillboardCreateComponent, canActivate: [AuthorizationGuardService] },
    { path: RoutePath.Billboard, component: BillboardComponent, canActivate: [AuthorizationGuardService] },
    { path: RoutePath.Panel_Create, component: PanelCreateComponent, canActivate: [AuthorizationGuardService] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})

export class AppRoutingModule {

}

