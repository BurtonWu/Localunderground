import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subscription, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { BillboardCreateRequestModel } from "./billboard-create.interface";
import { AuthorizationService } from "../auth/auth.services";

@Injectable()
export class BillboardService {
    private baseUrl = environment.apiUrl + '/api/billboard';

    constructor(private http: HttpClient, private authService: AuthorizationService) {
    }

    public create(params: BillboardCreateRequestModel): Observable<any> {
        return this.http.post(this.baseUrl, params);
    }

    // public register(params: RegisterUserModel): Observable<any> {
    //     return this.http.post(this.baseUrl + 'register', params);
    // }

    public saveToken(token) {
        localStorage.setItem('token', token);
    }

    public getToken() {
        return localStorage.getItem('token');
    }

}