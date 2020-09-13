import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from './auth/auth-login.component';
import { AuthRegisterComponent } from './auth/auth-register.component';
import { BillboardCreateComponent } from './billboard/billboard-create.component';
import { AuthorizationGuardService } from './auth/auth-guard.service';

const routes: Routes = [
    // { path: '', component: AuthLoginComponent, pathMatch: 'full' },
    // { path: 'user', component: AuthLoginComponent, 
    //     children: [
    //         { path: 'register', component: AuthRegisterComponent },
    //         { path: 'login', component: AuthLoginComponent }

    //     ]
    // }
    { path: 'login', component: AuthLoginComponent },
    { path: 'register', component: AuthRegisterComponent },
    { path: 'billboard/create', component: BillboardCreateComponent, canActivate: [AuthorizationGuardService] },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}