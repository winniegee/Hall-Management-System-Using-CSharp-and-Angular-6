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
import { Router } from "@angular/router";
var UserRegComponent = /** @class */ (function () {
    function UserRegComponent(hall, router) {
        this.hall = hall;
        this.router = router;
        this.model = {
            username: "",
            email: "",
            password: "",
            confirmpassword: "",
            IsUser: false,
            IsHallOwner: false,
            IsServiceProvider: false
        };
        this.errorMsg = "";
        // this.creds();
    }
    UserRegComponent.prototype.ngOnInit = function () {
    };
    UserRegComponent.prototype.onUserReg = function () {
        var _this = this;
        console.log("component creds: " + JSON.stringify(this.model));
        // console.log("component creds role " + this.model.role)
        this.model.IsUser = true;
        console.log("component creds: " + JSON.stringify(this.model));
        this.hall.userreg(this.model)
            .subscribe(function (success) {
            _this.router.navigate(["login"]);
        }, function (err) { return alert(JSON.stringify(err.error)); });
    };
    UserRegComponent = __decorate([
        Component({
            selector: 'app-user-reg',
            templateUrl: './user-reg.component.html',
            styleUrls: ['./user-reg.component.css']
        }),
        __metadata("design:paramtypes", [HallService, Router])
    ], UserRegComponent);
    return UserRegComponent;
}());
export { UserRegComponent };
//# sourceMappingURL=user-reg.component.js.map