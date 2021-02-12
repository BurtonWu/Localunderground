import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subscription, Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { AuthorizationService } from "../../../auth/auth.services";
import { StoryBoardViewModel } from "./story-board-view.interface";

@Injectable()
export class StoryBoardViewService {
    private baseUrl = environment.apiUrl + '/api/storyboard';

    constructor(private http: HttpClient, private authService: AuthorizationService) {
    }

    public getStoryboardViewModel(storyBoardId: number): Observable<StoryBoardViewModel> {
        return this.http.get<StoryBoardViewModel>(this.baseUrl, {params: {storyBoardId: storyBoardId.toString()}});
    }
}