import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subscription, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { AuthorizationService } from "../auth/auth.services";
import { ImageWidgetUpdateParams, ImageWidgetCreateParams, ImageWidgetModel } from "./image-widget.interface";
import { map } from "rxjs/operators";

@Injectable()
export class ImageWidgetService {
    private baseUrl = environment.apiUrl + '/api/imagewidget';

    constructor(private http: HttpClient, private authService: AuthorizationService) {
    }

    // public getWidgets(storyBoardId: number): Observable<TextWidgetModel[]> {
    //     return this.http.get<TextWidgetModel[]>(this.baseUrl, {params: {storyBoardId: storyBoardId.toString()}});
    // }

    public createWidget(params: ImageWidgetCreateParams): Observable<any> {
        return this.http.post(this.baseUrl, params);
    }

    public udpateWidget(params: ImageWidgetUpdateParams): Observable<any> {
        return this.http.put(this.baseUrl, params);
    }

    // public getWidgets(storyBoardId: number) : Observable<ImageWidgetModel[]> {
    //     return this.http.get<ImageWidgetModel[]>(this.baseUrl, {params: {storyBoardId: storyBoardId.toString()}});
    // }
    // public uploadImage(params: FormData): Observable<any> {
    //     return this.http.post(this.baseUrl + '/images', params);
    // }

    public getWidgets(storyBoardId: number): Observable<ImageWidgetModel[]> {
        return this.http.get<ImageWidgetModel[]>(this.baseUrl, {params: {storyBoardId: storyBoardId.toString()}}).pipe(
            map(models => {
                models.forEach(model => {
                    model.imageData.forEach((imageData) => {
                        imageData.base64ImageData = 'data:image/png;base64,' + imageData.base64ImageData;
                    });
                });
                return models;
            }));
    }
}