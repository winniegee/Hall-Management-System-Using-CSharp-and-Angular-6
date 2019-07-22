import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Http, RequestOptions, Response, URLSearchParams } from "@angular/http";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, Output } from '@angular/core';
import { User } from '../Shared/UserModel';
import { LocationModel } from "MainApp/app/Shared/LocationModel";
import { Halls } from "../Shared/Hall";
import { BookingsModel } from "MainApp/app/Shared/BookingsModel";



@Injectable()
export class HallService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    constructor(private router: Router, private http: HttpClient, private user: User) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    public halls = [];
    public locations = [];
    public purposes = [];
    public bookings = [];
    public logged: boolean;
    private token: string = "";
    private tokenExpiration: Date;
    public loadHalls() {
        return this.http.get("http://localhost:5000/api/halls/get")
            .pipe(
            map((data: any[]) => {
                this.halls = data;
                console.log(this.halls)
                return true;

            }));

    }
    public isAdmin: boolean;
    public isUser: boolean;
    public isHall: boolean;
    public login(creds): Observable<boolean> {
        return this.http.post("http://localhost:5000/api/account/login", creds).pipe(
            map((user: any) => {
                //login successful of there is a jwt token in the response
                if (user && user.token) {
                    console.log("user token is" + user.token);
                    console.log("user role is" + user.roles);
                    this.logged = true;
                    if (user.roles == "Administrator") {
                        this.isAdmin = true;
                    }
                    if (user.roles == "Users") {
                        this.isUser = true;
                    }
                    if (user.roles == "Hall owner") {
                        this.isHall = true;
                    }

                    //store user details and jwt token in local storage, to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }
    public logout() {
        //remove user from local storage to log out user
        localStorage.removeItem('currentUser');

        this.currentUserSubject.next(null);
    }

    public loadLocations() {
        return this.http.get("http://localhost:5000/api/halls/getLoc")
            .pipe(
            map((data: any[]) => {
                this.locations = data
                return true;
            }))
    }
    public loadPurposes() {
        return this.http.get("http://localhost:5000/api/halls/getpur")
            .pipe(
            map((data: any[]) => {
                this.purposes = data
                return true;
            }))
    }


    public get loginRequired(): boolean {
        return this.token.length == 0 || this.tokenExpiration > new Date();
    }

    public userreg(model): Observable<boolean> {
        let body = JSON.stringify(model);
        console.log("service creds: " + JSON.stringify(model));
        return this.http.post("http://localhost:5000/api/account/register", model).pipe(
            map((data: any) => {
                console.log("creds: " + model)
                return true;
            }));
    }
    public hallreg(model): Observable<boolean> {
        var body = JSON.stringify(model);
        console.log("body stringified is " + body);
        console.log("service creds: " + model.hallname, model.description, model.email, model.password, model.confirmpassword, model.Location, model.purposes, model.image, model.price);
        return this.http.post("http://localhost:5000/api/halls/createHall", model).pipe(
            map((data: any) => {
                console.log("last creds: " + model);
                console.log("image path returned is " + model.image);
                return true;
            }));
    }
    public bookHall(bookDets): Observable<boolean> {

        return this.http.post("http://localhost:5000/api/bookhall", bookDets).pipe(
            map((data: any) => {
                return true;
            })
        );
    }

    public getLocationByName(selection): Observable<LocationModel> {
        var newselection = JSON.stringify(selection);
        console.log("just before posting to getlocationbyname");
        console.log("selection is" + selection + "and new selection" + newselection);
        return this.http.post("http://localhost:5000/api/halls/FindLocationByName", { location: selection }).pipe(
            map((Location: any) => {
                console.log("location selected: " + selection);
                console.log("location gotten: " + JSON.stringify(Location));
                return Location;
            }));
    }
    public getPurposeByName(selection): Observable<LocationModel> {
        var newselection = JSON.stringify(selection);
        console.log("selection is" + selection + "and new selection" + newselection);
        return this.http.post("http://localhost:5000/api/halls/FindPurposeByName", { purpose: selection }).pipe(
            map((purpose: any) => {
                console.log("purpose gotten: " + JSON.stringify(purpose));
                return purpose;   
            }));
    }
    public getHallById(id: string): Observable<Halls> {
        console.log("id in service is " + id);
        // let options = new RequestOptions({ headers: myHeaders, params: myParams });
        return this.http.get("http://localhost:5000/api/halls/getHallById/", { params: {ID:id} }).pipe(
            map((HallResult: any) => {
                console.log("the hall returned is " + HallResult)
                return HallResult;
            }))
    }
    public getBookings(hallId): Observable<boolean> {
        return this.http.get("http://localhost:5000/api/halls/getBooking/", { params: { hallID: hallId } }).pipe(
            map((booking: any) => {
                console.log("bookings are " + JSON.stringify(booking))
                this.bookings = booking;
                return true;
            }))
    }
    public book(model): Observable<boolean> {
        console.log("booking model in service are " + JSON.stringify(model))
        var modelStringified = JSON.stringify(model);
        return this.http.post("http://localhost:5000/api/halls/book", model).pipe(
            map((book: any) => {
                return true;
            }))
    }
}
