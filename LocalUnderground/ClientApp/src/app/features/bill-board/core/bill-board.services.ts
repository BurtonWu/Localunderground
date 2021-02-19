import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Subscription, Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { AuthorizationService } from "../../../auth/auth.services";
import { PostCardGetParams, PostCardModel } from "../post-card/post-card.interface";
import { map } from "rxjs/operators";
import { AppHttpService } from "src/app/app-config/app-http-client";

@Injectable()
export class BillBoardService {
    private baseUrl = environment.apiUrl + '/api/billboard';

    constructor(private http: AppHttpService, private authService: AuthorizationService) {
    }

    public getPostCards(params?: PostCardGetParams): Observable<PostCardModel[]> {
        return this.http.get<PostCardModel[]>(this.baseUrl + '/postcard', this.http.getHttpOptions(params));
    }

    // public createStoryboard(params: StoryboardCreateRequestParams): Observable<any> {
    //     return this.http.post(this.baseUrl, params);
    // }

    // public udpateStoryboard(params: StoryboardUpdateParams): Observable<any> {
    //     return this.http.put(this.baseUrl, params);
    // }

    // public deleteStoryboard(params: number): Observable<any> {
    //     return this.http.delete(this.baseUrl, { params: { storyBoardId: params.toString() } });
    // }

    // public saveToken(token) {
    //     localStorage.setItem('token', token);
    // }

    // public getToken() {
    //     return localStorage.getItem('token');
    // }

}