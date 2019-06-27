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
import { HallService } from '../Shared/HallService';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
var HallComponent = /** @class */ (function () {
    function HallComponent(hall, router, http) {
        this.hall = hall;
        this.router = router;
        this.http = http;
        this.purpose = '';
        this.location = '';
        this.halls = [];
        this.locations = [];
        this.purposes = [];
        this.createImgPath = function (serverPath) {
            return "https:localhost:5000/$serverPath";
        };
    }
    HallComponent.prototype.onChange = function (event) {
        this.location = event.name;
        // this.selectedValue.next(selectedValue);
        // const newval=event.target.value;
        //console.log("the new selected value " + selectedValue.event.value);
        console.log("newval is " + event.name);
        console.log("location is " + JSON.stringify(this.location));
        this.ListFilter = event.name;
    };
    HallComponent.prototype.setLocation = function (loc) {
        this.location = loc;
    };
    HallComponent.prototype.setPurpose = function (pur) {
        this.purpose = pur;
    };
    Object.defineProperty(HallComponent.prototype, "ListFilter", {
        // listFilter: string;
        get: function () {
            return this.location;
        },
        set: function (value) {
            //this.location = value;
            console.log("in setting " + this.location, this.ListFilter);
            console.log("filtered halls " + JSON.stringify(this.filteredProducts));
            // this.performFilter(this.ListFilter);
            // this.filteredProducts = this.ListFilter ? this.performFilter(this.ListFilter) : this.halls;
            console.log("filtered halls " + JSON.stringify(this.filteredProducts));
        },
        enumerable: true,
        configurable: true
    });
    HallComponent.prototype.performFilter = function () {
        var _this = this;
        console.log("before post loc" + JSON.stringify(this.location));
        console.log("before post pur" + JSON.stringify(this.purpose));
        return this.http.post("http://localhost:5000/api/halls/filterByLocation", { location: this.location, purpose: this.purpose }).pipe(map(function (data) {
            console.log("after post");
            console.log("data " + data);
            _this.filteredProducts = JSON.parse(data['_body']);
            console.log("filtered halls " + JSON.stringify(_this.filteredProducts));
            //return data;
        })).subscribe(function (success) {
            if (success) {
                _this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
            }
        });
    };
    HallComponent.prototype.toArray = function (answers) {
        return Object.keys(answers).map(function (key) { return answers[key]; });
    };
    HallComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.hall.loadHalls()
            .subscribe(function (success) {
            if (success) {
                _this.halls = _this.hall.halls;
                _this.filteredProducts = _this.halls;
            }
        });
        this.hall.loadLocations().subscribe(function (success) {
            if (success) {
                _this.locations = _this.hall.locations;
            }
        });
        this.hall.loadPurposes().subscribe(function (success) {
            if (success) {
                _this.purposes = _this.hall.purposes;
            }
        });
    };
    HallComponent.prototype.hallDet = function (id) {
        /// console.log("id is " + this.route.snapshot.paramMap.get('id'));
        this.router.navigate(['/hallDetails', id]);
    };
    HallComponent = __decorate([
        Component({
            selector: 'app-hall',
            templateUrl: './hall.component.html',
            styleUrls: ['./hall.component.css']
        }),
        __metadata("design:paramtypes", [HallService, Router, Http])
    ], HallComponent);
    return HallComponent;
}());
export { HallComponent };
//# sourceMappingURL=hall.component.js.map