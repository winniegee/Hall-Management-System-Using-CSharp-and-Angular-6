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
import { Router, ActivatedRoute } from '@angular/router';
import { HallService } from '../Shared/HallService';
var ProductDetailsComponent = /** @class */ (function () {
    function ProductDetailsComponent(route, router, hallService) {
        this.route = route;
        this.router = router;
        this.hallService = hallService;
    }
    ProductDetailsComponent.prototype.ngOnInit = function () {
        console.log("id is " + this.route.snapshot.paramMap.get('id'));
        var param = this.route.snapshot.paramMap.get('id');
        if (param) {
            var id = +param;
            this.getProduct(id);
        }
    };
    ProductDetailsComponent.prototype.getProduct = function (id) {
        var _this = this;
        this.hallService.getHallById(id).subscribe(function (hall) { return _this.hall = hall; });
    };
    ProductDetailsComponent = __decorate([
        Component({
            selector: 'app-product-details',
            templateUrl: './product-details.component.html',
            styleUrls: ['./product-details.component.css']
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            Router, HallService])
    ], ProductDetailsComponent);
    return ProductDetailsComponent;
}());
export { ProductDetailsComponent };
//# sourceMappingURL=product-details.component.js.map