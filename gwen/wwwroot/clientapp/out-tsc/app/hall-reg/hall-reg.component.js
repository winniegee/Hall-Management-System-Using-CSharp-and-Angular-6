var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { HallService } from 'MainApp/app/Shared/HallService';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
var HallRegComponent = /** @class */ (function () {
    function HallRegComponent(hall, router, http) {
        this.hall = hall;
        this.router = router;
        this.http = http;
        this.loc = "";
        this.pur = "";
        this.locations = [];
        this.dropdownSettings = {};
        this.purposes = [];
        this.selectedpurposes = [];
        this.model = {
            hallname: "",
            email: "",
            description: "",
            password: "",
            confirmpassword: "",
            locations: null,
            purposes: null,
            price: 0.00,
            image: "",
            IsUser: false,
            IsHallOwner: false
        };
        //public response:{ dbPath: '' };
        //public uploadFinished = (event) => {
        //    this.response = event;
        //}
        this.errorMsg = "";
        this.onUploadFinished = new EventEmitter();
        // this.creds();
    }
    HallRegComponent.prototype.ngOnInit = function () {
        var _this = this;
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
        this.dropdownSettings = {
            singleSelection: false,
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'Unselect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true
        };
    };
    HallRegComponent.prototype.getLocationByNamee = function (event) {
        var _this = this;
        console.log("event is " + event);
        this.hall.getLocationByName(event).subscribe(function (success) {
            _this.model.locations = success;
            console.log("success value is" + success);
        }, function (err) { return _this.errorMsg = "Failed to get location"; });
    };
    HallRegComponent.prototype.getPurposeByNamee = function (event) {
        var _this = this;
        console.log("events are " + event);
        this.hall.getPurposeByName(event).subscribe(function (success) {
            _this.model.purposes = success;
            console.log("success value is" + success);
        }, function (err) { return _this.errorMsg = "Failed to get purpose"; });
    };
    HallRegComponent.prototype.onItemSelect = function (item) {
        console.log(item);
    };
    HallRegComponent.prototype.onSelectAll = function (items) {
        console.log(items);
    };
    HallRegComponent.prototype.resolveAfterFiveSeconds = function (x) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(x);
            }, 5000);
        });
    };
    HallRegComponent.prototype.purposeSend = function () {
        var list = [];
        for (var _i = 0, _a = this.selectedpurposes; _i < _a.length; _i++) {
            var result = _a[_i];
            list.push(result.name);
        }
        console.log("value of selected list's name " + list);
        this.getPurposeByNamee(list);
    };
    HallRegComponent.prototype.onHallReg = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.purposeSend()];
                    case 1:
                        _a.sent();
                        this.model.IsHallOwner = true;
                        this.model.image = this.imagepath;
                        console.log("selected purposes are " + this.selectedpurposes + "stringified are " + JSON.stringify(this.selectedpurposes));
                        console.log("image  is now " + this.model.image);
                        this.hall.hallreg(this.model)
                            .subscribe(function (success) {
                            _this.router.navigate(["hall"]);
                        }, function (err) { return _this.errorMsg = "Failed to Create"; });
                        return [2 /*return*/];
                }
            });
        });
    };
    HallRegComponent.prototype.upload = function (files) {
        var _this = this;
        if (files.length === 0) {
            return;
        }
        console.log("entered upload");
        //var mimeType = files[0].type;
        //if (mimeType.match(/image\/*/) == null) {
        //    this.message = "Only images are supported";
        //    return;
        //}
        //var reader = new FileReader();
        //reader.readAsDataURL(files[0]);
        //reader.onload = (_event) => {
        //    this.imagepath = reader.result;
        //}
        var fileToUpload = files[0];
        var formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        // var reader = new FileReader();
        console.log("got to just before post");
        var x;
        this.http.post('http://localhost:5000/api/upload', formData, { reportProgress: true, observe: 'events' }).subscribe(function (event) {
            console.log("image path " + _this.model.image);
            if (event.type === HttpEventType.UploadProgress) {
                _this.progress = Math.round(100 * event.loaded / event.total);
            }
            else if (event.type == HttpEventType.Response) {
                console.log("event body is " + JSON.stringify(event.body) + "and the ordinary is " + event.body);
                console.log("event body exact path is " + JSON.stringify(event.body) + "and the ordinary is " + event.body);
                var pathh = JSON.stringify(event.body).slice(12).split("}")[0];
                var path = pathh.slice(1, pathh.length - 1);
                console.log("path after split is " + path);
                _this.message = "upload successful";
                _this.imagepath = path;
                // this.onUploadFinished.emit(event.body);
                console.log("image path is now " + _this.imagepath);
            }
        });
    };
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], HallRegComponent.prototype, "public", void 0);
    HallRegComponent = __decorate([
        Component({
            selector: 'app-hall-reg',
            templateUrl: './hall-reg.component.html',
            styleUrls: ['./hall-reg.component.css']
        }),
        __metadata("design:paramtypes", [HallService, Router, HttpClient])
    ], HallRegComponent);
    return HallRegComponent;
}());
export { HallRegComponent };
//# sourceMappingURL=hall-reg.component.js.map