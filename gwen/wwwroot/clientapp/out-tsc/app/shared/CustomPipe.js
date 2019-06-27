var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var CustomPipe = /** @class */ (function () {
    function CustomPipe() {
    }
    CustomPipe.prototype.transform = function (items, location) {
        if (!items)
            return [];
        if (!location)
            return items;
        //  if (items || !location) return items;
        console.log("gotten just before filter");
        console.log("location in filter is " + location);
        console.log("final from filter " + items.Locations.toString());
        return items.Locations.toLocaleLowerCase().indexOf(location) !== -1;
    };
    CustomPipe = __decorate([
        Pipe({
            name: 'listFilter',
            pure: false
        })
    ], CustomPipe);
    return CustomPipe;
}());
export { CustomPipe };
//# sourceMappingURL=CustomPipe.js.map