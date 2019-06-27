import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HallService } from "MainApp/app/Shared/HallService";
import { Observable } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //add authorization header with jwt token if available
        let currentUser = this.hall.currentUserValue;
        if (currentUser && currentUser.token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }
        return next.handle(req);
    }
    constructor(private hall: HallService) {

    }
}