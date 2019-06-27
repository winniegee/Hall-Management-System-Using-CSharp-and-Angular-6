import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HallService } from 'MainApp/app/Shared/HallService';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.hall.currentUserValue;
        if (currentUser) {
            if (route.data.roles && route.data.roles.indexOf(currentUser.roles) === -1) {
                this.router.navigate(['/']);
                return false;
            }
            return true;
        }
    }
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
   
        constructor(private router: Router, private http: HttpClient, private hall:HallService) {
            this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
            this.currentUser = this.currentUserSubject.asObservable();
    }
        public get currentUserValue(): User {
            return this.currentUserSubject.value;
        }
    }


export class User {
    username: string;
    email: string;
    password: string;
    confirmpassword: string;
    role: string;
    IsUser: boolean;
    IsHallOwner: boolean;

}

