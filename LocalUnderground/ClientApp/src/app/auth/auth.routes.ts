import { Routes } from "@angular/router";
import { AuthLoginComponent } from "./auth-login.component";
import { AuthRegisterComponent } from "./auth-register.component";

export const authRoutes: Routes = [
    {
        path: 'login',
        component: AuthLoginComponent
    },
    {
        path: 'register',
        component: AuthRegisterComponent
    }
];