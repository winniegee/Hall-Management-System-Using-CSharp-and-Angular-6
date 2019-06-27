var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { HallService } from "../Shared/HallService";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/internal/operators/first';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(hall, router, route) {
        this.hall = hall;
        this.router = router;
        this.route = route;
        this.loading = false;
        this.creds = {
            email: "",
            password: ""
        };
        this.errorMsg = "";
        if (this.hall.currentUserValue) {
            this.router.navigate(['/']);
        }
    }
    LoginComponent.prototype.canActivate = function (route, state) {
        var currentUser = this.hall.currentUserValue;
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
    };
    LoginComponent.prototype.onLogin = function () {
        var _this = this;
        this.loading = true;
        this.hall.login(this.creds)
            .pipe(first())
            .subscribe(function (data) {
            localStorage.setItem('userToken', data.access_token);
            localStorage.setItem('userRoles', data.role);
            console.log("token from login.ts is" + data.access_token);
            console.log("role from login.ts is" + data.roles);
            _this.router.navigate([_this.returnUrl]);
            _this.hall.logged = true;
        }, function (err) { _this.errorMsg = "Failed to login"; });
    };
    LoginComponent.prototype.ngOnInit = function () {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [HallService, Router, ActivatedRoute])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map