var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { HallComponent } from './hall/hall.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { HallService } from "./Shared/HallService";
import { User } from "./Shared/UserModel";
import { ErrorInterceptor } from "./Shared/ErrorInterceptor";
import { BizRegisterComponent } from './biz-register/biz-register.component';
import { UserRegComponent } from './user-reg/user-reg.component';
import { HallRegComponent } from './hall-reg/hall-reg.component';
import { HallEditAndDeleteComponent } from './hall-edit-and-delete/hall-edit-and-delete.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { HallDetailsComponent } from './hall-details/hall-details.component';
import { CustomPipe } from './Shared/CustomPipe';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent,
                HallComponent,
                HomeComponent,
                LoginComponent,
                PageNotFoundComponent,
                BizRegisterComponent,
                UserRegComponent,
                HallRegComponent,
                HallEditAndDeleteComponent,
                AdminpageComponent,
                HallDetailsComponent,
                CustomPipe
            ],
            imports: [
                BrowserModule,
                HttpClientModule,
                NgMultiSelectDropDownModule,
                BrowserAnimationsModule,
                RouterModule.forRoot([
                    { path: 'home', component: HomeComponent },
                    { path: 'hall', component: HallComponent },
                    { path: 'login', component: LoginComponent },
                    { path: 'userreg', component: UserRegComponent },
                    { path: 'bizreg', component: BizRegisterComponent },
                    { path: 'hallreg', component: HallRegComponent },
                    { path: 'admin', component: AdminpageComponent },
                    { path: 'hallDetails/:id', component: HallDetailsComponent },
                    { path: '', redirectTo: 'home', pathMatch: 'full' },
                    { path: '**', component: PageNotFoundComponent }
                ]),
                HttpModule,
                FormsModule,
                OwlDateTimeModule,
                OwlNativeDateTimeModule
            ],
            providers: [
                HallService,
                User,
                ErrorInterceptor
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map