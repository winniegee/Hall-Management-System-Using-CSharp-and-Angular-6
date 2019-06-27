import { Component, OnInit } from '@angular/core';
import { HallService } from "../Shared/HallService";
import { Router } from "@angular/router";
@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.component.html',
  styleUrls: ['./user-reg.component.css']
})
export class UserRegComponent implements OnInit {

    constructor(public hall: HallService, private router: Router) {
        // this.creds();
    }
    ngOnInit() {
    }
    public model = {
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        IsUser: false,
        IsHallOwner: false,
        IsServiceProvider: false
    }
    errorMsg: string = "";
   
    onUserReg() {
        console.log("component creds: " + JSON.stringify( this.model))
       // console.log("component creds role " + this.model.role)
        this.model.IsUser = true;
        console.log("component creds: " + JSON.stringify(this.model))
        this.hall.userreg(this.model)
            .subscribe(success => {
                this.router.navigate(["login"])
            }, err => this.errorMsg = "Failed to Register")
    }


}
