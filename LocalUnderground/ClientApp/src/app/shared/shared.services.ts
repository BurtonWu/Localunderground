import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subscription, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { AuthorizationService } from "../auth/auth.services";
import { map, catchError } from 'rxjs/operators';
import { Category } from "./shared.interface";

@Injectable()
export class SharedService {
    private baseUrl = environment.apiUrl + '/api/classification';

    constructor(private http: HttpClient, private authService: AuthorizationService) {
    }

    public GetCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.baseUrl);
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