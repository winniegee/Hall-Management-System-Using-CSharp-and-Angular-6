var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../Shared/UserModel';
var HallService = /** @class */ (function () {
    function HallService(router, http, user) {
        this.router = router;
        this.http = http;
        this.user = user;
        this.halls = [];
        this.locations = [];
        this.purposes = [];
        this.bookings = [];
        this.token = "";
        this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    Object.defineProperty(HallService.prototype, "currentUserValue", {
        get: function () {
            return this.currentUserSubject.value;
        },
        enumerable: true,
        configurable: true
    });
    HallService.prototype.loadHalls = function () {
        var _this = this;
        return this.http.get("http://localhost:5000/api/halls/get")
            .pipe(map(function (data) {
            _this.halls = data;
            console.log(_this.halls);
            return true;
        }));
    };
    HallService.prototype.login = function (creds) {
        var _this = this;
        return this.http.post("http://localhost:5000/api/account/login", creds).pipe(map(function (user) {
            //login successful of there is a jwt token in the response
            if (user && user.token) {
                console.log("user token is" + user.token);
                console.log("user role is" + user.roles);
                _this.logged = true;
                if (user.roles == "Administrator") {
                    _this.isAdmin = true;
                }
                if (user.roles == "Users") {
                    _this.isUser = true;
                }
                if (user.roles == "Hall owner") {
                    _this.isHall = true;
                }
                //store user details and jwt token in local storage, to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                _this.currentUserSubject.next(user);
            }
            return user;
        }));
    };
    HallService.prototype.logout = function () {
        //remove user from local storage to log out user
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    };
    HallService.prototype.loadLocations = function () {
        var _this = this;
        return this.http.get("http://localhost:5000/api/halls/getLoc")
            .pipe(map(function (data) {
            _this.locations = data;
            return true;
        }));
    };
    HallService.prototype.loadPurposes = function () {
        var _this = this;
        return this.http.get("http://localhost:5000/api/halls/getpur")
            .pipe(map(function (data) {
            _this.purposes = data;
            return true;
        }));
    };
    Object.defineProperty(HallService.prototype, "loginRequired", {
        get: function () {
            return this.token.length == 0 || this.tokenExpiration > new Date();
        },
        enumerable: true,
        configurable: true
    });
    HallService.prototype.userreg = function (model) {
        var body = JSON.stringify(model);
        console.log("service creds: " + JSON.stringify(model));
        return this.http.post("http://localhost:5000/api/account/register", model).pipe(map(function (data) {
            console.log("creds: " + model);
            return true;
        }));
    };
    HallService.prototype.hallreg = function (model) {
        var body = JSON.stringify(model);
        console.log("body stringified is " + body);
        console.log("service creds: " + model.hallname, model.description, model.email, model.password, model.confirmpassword, model.Location, model.purposes, model.image, model.price);
        return this.http.post("http://localhost:5000/api/halls/createHall", model).pipe(map(function (data) {
            console.log("last creds: " + model);
            console.log("image path returned is " + model.image);
            return true;
        }));
    };
    HallService.prototype.bookHall = function (bookDets) {
        return this.http.post("http://localhost:5000/api/bookhall", bookDets).pipe(map(function (data) {
            return true;
        }));
    };
    HallService.prototype.getLocationByName = function (selection) {
        var newselection = JSON.stringify(selection);
        console.log("just before posting to getlocationbyname");
        console.log("selection is" + selection + "and new selection" + newselection);
        return this.http.post("http://localhost:5000/api/halls/FindLocationByName", { location: selection }).pipe(map(function (Location) {
            console.log("location selected: " + selection);
            console.log("location gotten: " + JSON.stringify(Location));
            return Location;
        }));
    };
    HallService.prototype.getPurposeByName = function (selection) {
        var newselection = JSON.stringify(selection);
        console.log("selection is" + selection + "and new selection" + newselection);
        return this.http.post("http://localhost:5000/api/halls/FindPurposeByName", { purpose: selection }).pipe(map(function (purpose) {
            console.log("purpose gotten: " + JSON.stringify(purpose));
            return purpose;
        }));
    };
    HallService.prototype.getHallById = function (id) {
        console.log("id in service is " + id);
        // let options = new RequestOptions({ headers: myHeaders, params: myParams });
        return this.http.get("http://localhost:5000/api/halls/getHallById/", { params: { ID: id } }).pipe(map(function (HallResult) {
            console.log("the hall returned is " + HallResult);
            return HallResult;
        }));
    };
    HallService.prototype.getBookings = function (hallId) {
        var _this = this;
        return this.http.get("http://localhost:5000/api/halls/getBooking/", { params: { hallID: hallId } }).pipe(map(function (booking) {
            console.log("bookings are " + JSON.stringify(booking));
            _this.bookings = booking;
            return true;
        }));
    };
    HallService.prototype.book = function (model) {
        console.log("booking model in service are " + JSON.stringify(model));
        var modelStringified = JSON.stringify(model);
        return this.http.post("http://localhost:5000/api/halls/book", model).pipe(map(function (book) {
            return true;
        }));
    };
    HallService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Router, HttpClient, User])
    ], HallService);
    return HallService;
}());
export { HallService };
//# sourceMappingURL=HallService.js.map