import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subscription, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { AuthorizationService } from "../auth/auth.services";
import { ImageWidgetUpdateParams, ImageWidgetCreateParams } from "./image-widget.interface";

@Injectable()
export class ImageWidgetService {
    private baseUrl = environment.apiUrl + '/api/textwidget';

    constructor(private http: HttpClient, private authService: AuthorizationService) {
    }

    // public getWidgets(storyBoardId: number): Observable<TextWidgetModel[]> {
    //     return this.http.get<TextWidgetModel[]>(this.baseUrl, {params: {storyBoardId: storyBoardId.toString()}});
    // }

    public createImageWidget(params: ImageWidgetCreateParams): Observable<any> {
        return this.http.post(this.baseUrl, params);
    }

    public udpateImageWidget(params: ImageWidgetUpdateParams): Observable<any> {
        return this.http.put(this.baseUrl, params);
    }


    // public uploadImage(params: FormData): Observable<any> {
    //     return this.http.post(this.baseUrl + '/images', params);
    // }

    // public getImages() : Observable<PanelImage[]> {

    //     return this.http.get<PanelImage[]>(this.baseUrl + '/images').pipe(
    //         map(images => {
    //             images.forEach(x => {
    //                 x.imageData = 'data:image/png;base64,' + x.imageData
    //             });
    //             return images;
    //         }
            
    //         ));
    // }
}