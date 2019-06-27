import { Component, OnInit } from '@angular/core';
import { HallService } from 'MainApp/app/Shared/HallService';
import { Router } from '@angular/router';
import { HttpRequest } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { LocationModel } from 'MainApp/app/Shared/LocationModel';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@Component({
    selector: 'app-hall-reg',
    templateUrl: './hall-reg.component.html',
    styleUrls: ['./hall-reg.component.css']
})
export class HallRegComponent implements OnInit {

    constructor(public hall: HallService, private router: Router, private http: HttpClient) {
        // this.creds();
    }
    public imagepath;
    public loc = "";
    public pur = ""; 
    public locations = [];
    public dropdownSettings = {};
    public purposes = [];
    public progress: number;
    public message: string;
    public selectedpurposes = [];
    ngOnInit() {
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
        this.dropdownSettings = {
            singleSelection: false,
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'Unselect All',
          //  itemsShowLimit: 3,
            allowSearchFilter: true
        };

    }
    
    getLocationByNamee(event):void {
        console.log("event is " + event);
        this.hall.getLocationByName(event).subscribe(success => {
            this.model.locations = success
            console.log("success value is" + success);
        }, err => this.errorMsg = "Failed to get location")
            
    }
    getPurposeByNamee(event): void {
    console.log("events are " + event);
    this.hall.getPurposeByName(event).subscribe(success => {
        this.model.purposes = success
            console.log("success value is" + success);
        }, err => this.errorMsg = "Failed to get purpose")
    }
     
    onItemSelect(item:any) {
        console.log(item);
    }
    onSelectAll(items: any) {
        console.log(items);
    }
    public model = {
        hallname: "",
        email: "",
        description: "",
        password: "",
        confirmpassword: "",
        locations:null,
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
    
    errorMsg: string = "";
    resolveAfterFiveSeconds(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            },5000)
        })
    }
    purposeSend() {
        let list: string[] = [];
        for (let result of this.selectedpurposes) {
            list.push(result.name);
        }
        console.log("value of selected list's name " + list);
        this.getPurposeByNamee(list);
    }
    async onHallReg() {
       await this.purposeSend();
        this.model.IsHallOwner = true;
        this.model.image = this.imagepath;
        console.log("selected purposes are " + this.selectedpurposes + "stringified are " + JSON.stringify(this.selectedpurposes));
        console.log("image  is now " + this.model.image);
         this.hall.hallreg(this.model)
            .subscribe(success => {
                this.router.navigate(["hall"])
            }, err => this.errorMsg = "Failed to Create")
    }

    @Output() public
    onUploadFinished = new EventEmitter();


    upload(files) {
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
        let fileToUpload = <File>files[0];
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        // var reader = new FileReader();
        console.log("got to just before post");
        var x;
        this.http.post('http://localhost:5000/api/upload', formData, { reportProgress: true, observe: 'events' }).subscribe(event => {
            console.log("image path " + this.model.image);
            if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);

            }
            else if (event.type == HttpEventType.Response) {
                console.log("event body is " + JSON.stringify(event.body) + "and the ordinary is " + event.body);
                console.log("event body exact path is " + JSON.stringify(event.body) + "and the ordinary is " + event.body);
                
                let pathh = JSON.stringify(event.body).slice(12).split("}")[0];
                let path = pathh.slice(1, pathh.length-1);
                
                console.log("path after split is " + path);
                this.message = "upload successful";
                this.imagepath = path;
               // this.onUploadFinished.emit(event.body);
                console.log("image path is now " + this.imagepath);
            }
        });
    }

    //public upload(files) {
    //    if (files.length === 0) {
    //        return;
    //    }
    //    let fileToUpload = <File>files[0];
    //    const formData = new FormData();
    //    formData.append('file', fileToUpload, fileToUpload.name);
    //    const uploadReq = new HttpRequest('POST', 'http://localhost:5000/api/upload', formData, {
    //        reportProgress: true,

    //    });
    //    this.http.request(uploadReq)
    //        //.pipe(map((data: any) => {
    //        //console.log("image path: " + data.image);
    //        //console.log("image path: " + data.fullpath);
    //        //this.model.image = data.image;
    //        //}))
    //        .subscribe((event) => {
    //            if (event.type === HttpEventType.UploadProgress) {
    //                this.progress = Math.round(100 * event.loaded / event.total);
    //                 map((data: any) => { this.model.image = data.image });
    //                console.log("image path is " + this.imagepath);
    //            }
    //            else if (event.type == HttpEventType.Response) {
    //                this.message = event.body.toString();
    //            }


    //        })
    //           }
}


