import { Component, OnInit } from '@angular/core';
import { HallService } from '../Shared/HallService';
import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { Halls } from 'MainApp/app/Shared/Hall';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
@Component({
    selector: 'app-hall',
    templateUrl: './hall.component.html',
    styleUrls: ['./hall.component.css']
})

export class HallComponent implements OnInit {
  
    public purpose= '';
    public location='';

    public selectedValue; //: Subject<string> = new Subject();
    onChange(event): void {
        this.location = event.name;
        // this.selectedValue.next(selectedValue);
       // const newval=event.target.value;
        //console.log("the new selected value " + selectedValue.event.value);
        console.log("newval is " + event.name);
        
        console.log("location is " + JSON.stringify(this.location));
        this.ListFilter = event.name;
    }

    constructor(private hall: HallService, private router: Router, private http:Http) {
        
    }
    public halls : Halls[]=[];
    public locations = [];
    public purposes = [];
    filteredProducts: any[];
    setLocation(loc) {
        this.location=loc
    }
    setPurpose(pur) {
        this.purpose=pur
    }
   // listFilter: string;
    get ListFilter() {
        return this.location;
    }
    public performFilter() {
        console.log("before post loc" + JSON.stringify(this.location));
        console.log("before post pur" + JSON.stringify(this.purpose));
        return this.http.post("http://localhost:5000/api/halls/filterByLocation", { location: this.location, purpose: this.purpose }).pipe(
            map((data: any) => {
                console.log("after post");
                console.log("data " + data);
                this.filteredProducts = JSON.parse(data['_body']);
                console.log("filtered halls " + JSON.stringify(this.filteredProducts));
               //return data;
           })).subscribe(success => {
               if (success) {
                   this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
               }
           });
    }

    set ListFilter(value: string) {
        //this.location = value;
        console.log("in setting " + this.location, this.ListFilter);
        console.log("filtered halls " + JSON.stringify(this.filteredProducts));
       // this.performFilter(this.ListFilter);
        // this.filteredProducts = this.ListFilter ? this.performFilter(this.ListFilter) : this.halls;
       console.log("filtered halls " + JSON.stringify (this.filteredProducts));
    }
    
    
    public toArray(answers: object) {
        return Object.keys(answers).map(key => answers[key]);
    }
    ngOnInit() {
        this.hall.loadHalls()
            .subscribe(success => {
                if (success) {
                    this.halls = this.hall.halls;
                    this.filteredProducts = this.halls;
                }
            });
        this.hall.loadLocations().subscribe(success => {
            if (success) {
                this.locations = this.hall.locations;
            }
        });
        this.hall.loadPurposes().subscribe(success => {
            if (success) {
                this.purposes = this.hall.purposes;
            }
        });
    }
    public createImgPath = (serverPath: string) => {
        return `https:localhost:5000/$serverPath`
    };
    
    public hallDet(id) {
       /// console.log("id is " + this.route.snapshot.paramMap.get('id'));
        this.router.navigate(['/hallDetails', id]);
    }
    //public check() {
    //        if (this.hall.loginRequired) {
    //            this.router.navigate(["login"]);
    //        }
    //        else {
    //            this.router.navigate(["home"]);
    //        }
    //}
    //public getlocations() {
    //    this.hall.loadLocations().subscribe(success => {
    //        if (success) {
    //            this.locations = this.hall.locations;
    //        }
    //    });
    
    }


