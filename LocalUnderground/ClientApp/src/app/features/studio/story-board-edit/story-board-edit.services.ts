import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subscription, Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { AuthorizationService } from "../../../auth/auth.services";
import { StoryBoardCore, StoryboardCreateRequestParams, StoryBoardModel, StoryboardUpdateParams } from "./story-board-edit.interface";
import { StoryBoardEditModel, StoryBoardViewModel } from "../../bill-board/story-board-view/story-board-view.interface";
import { map } from "rxjs/operators";
import { StoryBoardStudioCardModel } from "../core/studio.interface";

@Injectable()
export class StoryBoardEditService {
    private baseUrl = environment.apiUrl + '/api/storyboard';

    constructor(private http: HttpClient, private authService: AuthorizationService) {
    }

    public getStoryBoardStudioCards(): Observable<StoryBoardStudioCardModel[]> {
        return this.http.get<StoryBoardStudioCardModel[]>(this.baseUrl + '/studiocard')
        .pipe(
            map(model => {
                model.forEach(m => m.selected = false);
                return model;
            })
        );
    }

    public getStoryboardEditModel(storyBoardId: number): Observable<StoryBoardEditModel> {
        return this.http.get<StoryBoardEditModel>(this.baseUrl + '/edit', {params: {storyBoardId: storyBoardId.toString()}});
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