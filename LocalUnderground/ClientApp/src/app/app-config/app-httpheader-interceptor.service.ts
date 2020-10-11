import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HttpHeaderInterceptorService implements HttpInterceptor {
    constructor() {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const keys = Object.keys(req.body);
        let formData: FormData;
        keys.some((key, i) => {
            if (req.body[key] instanceof FormData && req.method == "POST") {
                formData = req.body[key];
                console.log(keys.splice(i, 1));
                return true;
            }
        });

        if (formData != null) {
            req.headers.append('enctype', 'multipart/form-data');
            keys.forEach((key) => {
                formData.append(key, req.body[key]);
            });
            req = req.clone({ body: formData });
        }
        return next.handle(req);
    }
}


