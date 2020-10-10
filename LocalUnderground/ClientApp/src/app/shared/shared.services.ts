import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subscription, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { AuthorizationService } from "../auth/auth.services";
import { PanelImage } from "../panel/panel.interface";
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class SharedService {
    private baseUrl = environment.apiUrl + '/api/panel';

    constructor(private http: HttpClient, private authService: AuthorizationService) {
    }

    public uploadImage(params: FormData): Observable<any> {
        return this.http.post(this.baseUrl + '/images', params);
    }

    public getImages() : Observable<PanelImage[]> {

        return this.http.get<PanelImage[]>(this.baseUrl + '/images').pipe(
            map(images => {
                images.forEach(x => {
                    x.imageData = 'data:image/png;base64,' + x.imageData
                });
                return images;
            }
            
            ));
    }
}