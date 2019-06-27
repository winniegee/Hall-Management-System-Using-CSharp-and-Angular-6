import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpProgressEvent, HttpHeaderResponse, HttpResponse, HttpUserEvent } from "@angular/common/http";
import { HallService } from '../Shared/HallService';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/internal/operators/catchError";
import { Injectable } from "@angular/core";

@Injectable()
export class ErrorInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        return next.handle(req).pipe(catchError(err => {
            if ([401, 403].indexOf(err.status) !== -1) {
                //autologout if 401 unauthorized or 403 forbidden result returned from api
                this.hall.logout();
                location.reload(true);
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
    constructor(private hall: HallService) {}
}