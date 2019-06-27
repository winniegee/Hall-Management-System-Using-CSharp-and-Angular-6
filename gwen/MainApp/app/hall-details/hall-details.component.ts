import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HallService } from 'MainApp/app/Shared/HallService';
import { Halls } from 'MainApp/app/Shared/Hall';

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
            this.getProduct(id);
        }
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


}
