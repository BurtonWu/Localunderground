import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginCredentials, RegisterUserModel } from "./auth/auth-login.interface";
import { Subscription, Observable } from "rxjs";
import { environment } from "../environments/environment";
import { AuthorizationService } from "./auth/auth.services";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

@Injectable()
export class AuthorizationGuardService implements CanActivate {
    private baseUrl = environment.apiUrl + '/api/user';

    constructor(
        private authService: AuthorizationService,
        private router: Router
        ) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        if(this.authService.isAuthenticated()){
            return true;
        } else {
            this.router.navigate(["login"]);
            return false;
        }
    }


}