import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subscription, Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { AuthorizationService } from "../../../../auth/auth.services";
import { StoryboardCreateRequestParams, StoryBoardModel, StoryboardUpdateParams } from "./story-board.interface";

@Injectable()
export class StoryBoardService {
    private baseUrl = environment.apiUrl + '/api/storyboard';

    constructor(private http: HttpClient, private authService: AuthorizationService) {
    }

    public getStoryboards(): Observable<StoryBoardModel[]> {
        return this.http.get<StoryBoardModel[]>(this.baseUrl);
    }

    public createStoryboard(params: StoryboardCreateRequestParams): Observable<any> {
        return this.http.post(this.baseUrl, params);
    }

    public udpateStoryboard(params: StoryboardUpdateParams): Observable<any> {
        return this.http.put(this.baseUrl, params);
    }

    public deleteStoryboard(params: number): Observable<any> {
        return this.http.delete(this.baseUrl, { params: { storyBoardId: params.toString() } });
    }

    // public saveToken(token) {
    //     localStorage.setItem('token', token);
    // }

    // public getToken() {
    //     return localStorage.getItem('token');
    // }

}