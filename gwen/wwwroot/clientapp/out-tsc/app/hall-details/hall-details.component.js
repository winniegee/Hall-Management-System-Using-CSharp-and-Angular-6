var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HallService } from 'MainApp/app/Shared/HallService';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
var HallDetailsComponent = /** @class */ (function () {
    function HallDetailsComponent(route, router, hallService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.hallService = hallService;
        this.model = {
            startTime: Date,
            EndTime: Date,
            status: false,
            hallId: 0
        };
        this.myFilter = function (d) {
            var date = d.getDate();
            var vDates = [];
            console.log("this.booking " + _this.booking);
            if (_this.booking) {
                console.log("entered the loop");
                _this.booking.forEach(function (value) {
                    for (var x = value.startTime; x <= value.EndTime; x.setDate(x.getDate() + 1)) {
                        vDates.push(x);
                        console.log("1  dates pushed are " + JSON.stringify(vDates));
                    }
                    console.log("dates pushed are " + JSON.stringify(vDates));
                    return !vDates.values;
                });
            }
            return;
        };
    }
    HallDetailsComponent.prototype.ngOnInit = function () {
        console.log("id is " + this.route.snapshot.paramMap.get('id'));
        var param = this.route.snapshot.paramMap.get('id');
        if (param) {
            var id = +param;
            this.model.hallId = id;
            this.getProduct(id);
            this.getBooking(id);
        }
    };
    HallDetailsComponent.prototype.getBooking = function (id) {
        var _this = this;
        this.hallService.getBookings(id).subscribe(function (success) {
            if (success) {
                _this.booking = _this.hallService.bookings;
            }
        });
    };
    HallDetailsComponent.prototype.getProduct = function (id) {
        var _this = this;
        this.hallService.getHallById(id).subscribe(function (hall) { return _this.hall = hall; });
    };
    HallDetailsComponent.prototype.onBack = function () {
        this.router.navigate(['\hall']);
    };
    HallDetailsComponent.prototype.Book = function () {
        var _this = this;
        this.model.startTime = this.selectedMoments[0];
        this.model.EndTime = this.selectedMoments[1];
        this.hallService.book(this.model).subscribe(function (success) {
            alert("Hall successfully booked");
            _this.router.navigate(["/hall"]);
        }, function (err) {
            alert(err.error); // "The hall is unavailable at this time, please choose anothe date or time")
        });
    };
    HallDetailsComponent = __decorate([
        NgModule({
            imports: [
                OwlDateTimeModule,
                OwlNativeDateTimeModule
            ]
        }),
        Component({
            selector: 'app-hall-details',
            templateUrl: './hall-details.component.html',
            styleUrls: ['./hall-details.component.css']
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            Router, HallService])
    ], HallDetailsComponent);
    return HallDetailsComponent;
}());
export { HallDetailsComponent };
//# sourceMappingURL=hall-details.component.js.map