import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subscription, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { AuthorizationService } from "../auth/auth.services";
import { TextWidgetUpdateParams, TextWidgetCreateParams } from "./text-widget.interface";

@Injectable()
export class TextWidgetService {
    private baseUrl = environment.apiUrl + '/api/textwidget';

    constructor(private http: HttpClient, private authService: AuthorizationService) {
    }

    public createTextWidget(params: TextWidgetCreateParams): Observable<any> {
        return this.http.post(this.baseUrl, params);
    }

    public udpateTextWidget(params: TextWidgetUpdateParams): Observable<any> {
        return this.http.put(this.baseUrl, params);
    }
    // public saveToken(token) {
    //     localStorage.setItem('token', token);
    // }

    // public getToken() {
    //     return localStorage.getItem('token');
    // }

}