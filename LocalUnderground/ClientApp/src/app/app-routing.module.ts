import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from './auth/auth-login.component';
import { AuthRegisterComponent } from './auth/auth-register.component';
import { PanelComponent } from './panel/panel.component';
import { PanelCreateComponent } from './panel/panel-create.component';

import { AuthorizationGuardService } from './app-auth-guard.service';
import { BillboardComponent } from './billboard/billboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'billboard', canActivate: [AuthorizationGuardService] },
    // { path: 'user', component: AuthLoginComponent, 
    //     children: [
    //         { path: 'register', component: AuthRegisterComponent },
    //         { path: 'login', component: AuthLoginComponent }

    //     ]
    // }
    { path: 'login', component: AuthLoginComponent },
    { path: 'register', component: AuthRegisterComponent },
    { path: 'billboard/create', component: PanelCreateComponent, canActivate: [AuthorizationGuardService] },
    { path: 'billboard', component: BillboardComponent, canActivate: [AuthorizationGuardService] },
    { path: 'panel/create', component: PanelCreateComponent, canActivate: [AuthorizationGuardService] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}