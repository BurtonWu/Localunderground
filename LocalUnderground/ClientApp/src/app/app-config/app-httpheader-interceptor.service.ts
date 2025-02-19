import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { AngularDeepCopy } from "../shared/shared.models";

@Injectable({
    providedIn: 'root'
})
export class HttpHeaderInterceptorService implements HttpInterceptor {
    constructor() {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let formData: FormData = null;
        if(req.body) {
            //if FormData exists in params, extract it
            const keys = Object.keys(req.body);
            keys.some((key, i) => {
                if (req.body[key] instanceof FormData && req.method == "POST") {
                    formData = req.body[key];
                    console.log(keys.splice(i, 1));
                    return true;
                }
            });
            //convert params to FormData
            if (formData != null) {
                req.headers.append('enctype', 'multipart/form-data');
                keys.forEach((key) => {
                    if(formData.has(key)) {
                        formData.set(key, req.body[key]);
                    } else {
                        formData.append(key, req.body[key]);
                    }
                });
                req = req.clone({ body: formData });
            }
        }
        return next.handle(req);
    }
}


