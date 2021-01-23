import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subscription, Observable } from "rxjs";
import { WidgetSortParams, WidgetDeleteParams } from "./widget.interface";
import { environment } from "src/environments/environment";
import { AuthorizationService } from "../auth/auth.services";

@Injectable()
export class WidgetService {
    private baseUrl = environment.apiUrl + '/api/widget';

    constructor(private http: HttpClient, private authService: AuthorizationService) {
    }

    public updateWidgetSort(params: WidgetSortParams) {
        return this.http.put(this.baseUrl + '/sort', params);
    }
    
      public deleteWidget(params: WidgetDeleteParams) {
        return this.http.put(this.baseUrl + '/delete', params);
    }
}