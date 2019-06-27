import { Component, OnInit } from '@angular/core';
import { HallService } from "../Shared/HallService";
import { Router } from '@angular/router';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../Shared/UserModel';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorInterceptor } from 'MainApp/app/Shared/ErrorInterceptor';
import { first } from 'rxjs/internal/operators/first';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, CanActivate {

    returnUrl: string;
    loading = false;
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        const currentUser = this.hall.currentUserValue;
        if (currentUser) {
            //check if route is restricted by role
            if (route.data.roles && route.data.role.indexOf(currentUser.roles) === -1) {
                //role not authorize, so redirect to home page
                this.router.navigate(['/']);
                return false;
            }
            //authorize, returnn true
            return true;
        }
        //not authenticated, redirect back to login page
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    constructor(private hall: HallService, private router: Router, private route:ActivatedRoute) {
        if (this.hall.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    public creds = {
        email: "",
        password: ""
    }
    errorMsg: string = "";

    onLogin() {
        this.loading = true;
        this.hall.login(this.creds)
            .pipe(first())
            .subscribe((data: any) => {
                localStorage.setItem('userToken', data.access_token);
                localStorage.setItem('userRoles', data.role);
                console.log("token from login.ts is" + data.access_token);
                console.log("role from login.ts is" + data.roles);
                this.router.navigate([this.returnUrl]);
                this.hall.logged = true;
            }, (err: HttpErrorResponse) => { this.errorMsg = "Failed to login" });
    }
    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

}
