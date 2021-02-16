import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginCredentials, RegisterUserModel } from "./auth-login.interface";
import { Subscription, Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class AuthorizationService {
    private baseUrl = environment.apiUrl + '/api/user';

    constructor(private http: HttpClient) {

    }

    public login(params: LoginCredentials): Observable<any> {
        return this.http.post(this.baseUrl + '/login', params); 
    }

    public register(params: RegisterUserModel): Observable<any> {
        return this.http.post(this.baseUrl + '/register', params);
    }

    public saveToken(token) {
        localStorage.setItem('token', token);
    }

    public getToken() {
        return localStorage.getItem('token');
    }

    public isAuthenticated() {
        return this.getToken() != null;
    }

    public logout() {
        localStorage.removeItem('token');
    }

}