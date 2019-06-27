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
import { HallService } from "../app/Shared/HallService";
import { Router } from '@angular/router';
import { User } from 'MainApp/app/Shared/UserModel';
var AppComponent = /** @class */ (function () {
    function AppComponent(hall, router, user) {
        var _this = this;
        this.hall = hall;
        this.router = router;
        this.user = user;
        this.title = "HMS";
        this.open = true;
        this.hall.currentUser.subscribe(function (x) { return _this.currentUser = x; });
    }
    //isAdmin() {
    //    if (this.user.token) {/* && this.currentUser.role === "administrator") {*/
    //         return true;
    //     }
    //}
    AppComponent.prototype.logout = function () {
        this.hall.logout();
        this.hall.logged = false;
        this.hall.isAdmin = false;
        this.hall.isHall = false;
        this.hall.isUser = false;
        console.log("token is+" + this.user.token);
        this.router.navigate(['/login']);
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        __metadata("design:paramtypes", [HallService, Router, User])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map