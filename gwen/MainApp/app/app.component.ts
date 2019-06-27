import { Component } from '@angular/core';
import { HallService } from "../app/Shared/HallService";
import { Router } from '@angular/router';
import { User } from 'MainApp/app/Shared/UserModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = "HMS";
    currentUser: User;
    cf: null;
    open = true;
    constructor(public hall: HallService, private router: Router, private user:User) {
        this.hall.currentUser.subscribe(x => this.currentUser = x);
    }
    
    //isAdmin() {
    //    if (this.user.token) {/* && this.currentUser.role === "administrator") {*/
    //         return true;
    //     }
    //}
   
     
    
   public logout() {
       this.hall.logout();
       this.hall.logged = false;
       this.hall.isAdmin = false;
       this.hall.isHall = false;
       this.hall.isUser = false;
       console.log("token is+" + this.user.token);
        this.router.navigate(['/login']);
    }
}
