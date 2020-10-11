import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subscription, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { BillboardCreateRequestModel } from "./billboard.interface";
import { AuthorizationService } from "../auth/auth.services";

@Injectable()
export class BillboardService {
    private baseUrl = environment.apiUrl + '/api/billboard';

    constructor(private http: HttpClient, private authService: AuthorizationService) {
    }

    public createBillboard(params: BillboardCreateRequestModel): Observable<any> {
        return this.http.post(this.baseUrl, params);
    }

    public getCards(): Observable<any> {
        return this.http.get(this.baseUrl);
    }

    public saveToken(token) {
        localStorage.setItem('token', token);
    }

    public getToken() {
        return localStorage.getItem('token');
    }

}