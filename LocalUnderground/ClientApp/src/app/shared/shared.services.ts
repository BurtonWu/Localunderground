import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subscription, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { AuthorizationService } from "../auth/auth.services";

@Injectable()
export class SharedService {
    private baseUrl = environment.apiUrl + '/api/panel';

    constructor(private http: HttpClient, private authService: AuthorizationService) {
    }

    public uploadImage(params: FormData): Observable<any> {
        return this.http.post(this.baseUrl + '/uploadimage', params);
    }

    
}