import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HallService } from 'MainApp/app/Shared/HallService';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Halls } from 'MainApp/app/Shared/Hall';
import { BookingsModel } from 'MainApp/app/Shared/BookingsModel';

@NgModule({
    imports: [
        OwlDateTimeModule,
        OwlNativeDateTimeModule
    ]
})
@Component({
    selector: 'app-hall-details',
    templateUrl: './hall-details.component.html',
    styleUrls: ['./hall-details.component.css']
})
export class HallDetailsComponent implements OnInit {
    constructor(private route: ActivatedRoute,
        private router: Router, private hallService: HallService) { }

    ngOnInit() {
        console.log("id is " + this.route.snapshot.paramMap.get('id'));
        const param = this.route.snapshot.paramMap.get('id');
        if (param) {
            const id = +param;
            this.model.hallId = id;
            this.getProduct(id);
            this.getBooking(id);
              }
    }
    public startDate: Date;
    public endDate: Date;
    public selectedMoments;
    public booking: BookingsModel[];
    public model = {
        startTime: Date,
        EndTime: Date,
        status: false,
        hallId: 0
    }
    public getBooking(id) {
        this.hallService.getBookings(id).subscribe(
            success => {
                if (success) {
                    this.booking = this.hallService.bookings;
                }
            })
    }
    public myFilter = (d: Date):boolean => {
        const date = d.getDate();
        var vDates = [];
        console.log("this.booking " + this.booking)
        if (this.booking) {
            console.log("entered the loop")
            this.booking.forEach(function (value) {
                for (var x = value.startTime; x <= value.EndTime; x.setDate(x.getDate()+1)) {
                    vDates.push(x);
                    console.log("1  dates pushed are " + JSON.stringify(vDates));
                }
                console.log("dates pushed are " + JSON.stringify(vDates));
                return !vDates.values;
            })
        }
        return;
        }
  
    hall: Halls | undefined;
    getProduct(id) {
        this.hallService.getHallById(id).subscribe(
             hall => this.hall = hall
        )
    }
    onBack() {
        this.router.navigate(['\hall']);
    }
    Book() {
        this.model.startTime = this.selectedMoments[0];
        this.model.EndTime = this.selectedMoments[1];
        this.hallService.book(this.model).subscribe(
            success => {
                alert("Hall successfully booked");
                this.router.navigate(["/hall"]);
            },
            err=> {
                alert(err.error);// "The hall is unavailable at this time, please choose anothe date or time")

            }
        )
    }


}
