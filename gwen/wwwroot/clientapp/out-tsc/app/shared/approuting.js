var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HallService } from 'MainApp/app/Shared/HallService';
var AuthGuard = /** @class */ (function () {
    function AuthGuard(router, http, hall) {
        this.router = router;
        this.http = http;
        this.hall = hall;
        this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var currentUser = this.hall.currentUserValue;
        if (currentUser) {
            if (route.data.roles && route.data.roles.indexOf(currentUser.roles) === -1) {
                this.router.navigate(['/']);
                return false;
            }
            return true;
        }
    };
    Object.defineProperty(AuthGuard.prototype, "currentUserValue", {
        get: function () {
            return this.currentUserSubject.value;
        },
        enumerable: true,
        configurable: true
    });
    AuthGuard = __decorate([
        Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [Router, HttpClient, HallService])
    ], AuthGuard);
    return AuthGuard;
}());
export { AuthGuard };
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
export { User };
//# sourceMappingURL=approuting.js.map