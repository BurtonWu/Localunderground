import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subscription, Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { AuthorizationService } from "../../../auth/auth.services";
import { PostCardModel } from "../post-card/post-card.interface";
import { map } from "rxjs/operators";

@Injectable()
export class BillBoardService {
    private baseUrl = environment.apiUrl + '/api/billboard';

    constructor(private http: HttpClient, private authService: AuthorizationService) {
    }

    public getPostCards(): Observable<PostCardModel[]> {
        return this.http.get<PostCardModel[]>(this.baseUrl + '/postcard').pipe(
            map(models => {
                models.forEach(model => {
                    model.coverPortrait = model.coverPortrait != null ? 'data:image/png;base64,' + model.coverPortrait : null;
                });
                return models;
            }));
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