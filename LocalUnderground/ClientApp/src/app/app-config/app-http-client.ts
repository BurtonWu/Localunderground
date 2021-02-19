import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Subscription, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class AppHttpService extends HttpClient {

    public getHttpOptions(model: any) {
        if (model == null) return {};
        return { params:  new HttpParams({fromObject: model}) };
    }
}