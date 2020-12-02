import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subscription, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { AuthorizationService } from "../auth/auth.services";
import { StoryboardCreateRequestModel } from "./story-board.interface";

@Injectable()
export class StoryBoardService {
    private baseUrl = environment.apiUrl + '/api/storyboard';

    constructor(private http: HttpClient, private authService: AuthorizationService) {
    }

    public createStoryboard(params: StoryboardCreateRequestModel): Observable<any> {
        return this.http.post(this.baseUrl, params);
    }

    public getStoryboards(): Observable<any> {
        return this.http.get(this.baseUrl);
    }

    // public saveToken(token) {
    //     localStorage.setItem('token', token);
    // }

    // public getToken() {
    //     return localStorage.getItem('token');
    // }

}