import { HttpService } from './../http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addpet',
  templateUrl: './addpet.component.html',
  styleUrls: ['./addpet.component.css']
})
export class AddpetComponent implements OnInit {

  newPet: any;
  error1: "";
  error2: "";
  error3: "";
  

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.newPet = {
      "name": "",
      "type": "",
      "description": "",
      "skill1": "",
      "skill2": "",
      "skill3": ""
    }
  }
  addPet(newPet) {
    let tempObservable = this._httpService.addServicePet(this.newPet);
    tempObservable.subscribe(data => {
      this.newPet = {
      "name": "",
      "type": "",
      "description": "",
      "skill1": "",
      "skill2": "",
      "skill3": ""
    }


    if (data["message"] == "Error") {
      console.log("There are errors")
      this.error1 = data["error"].errors.name.message
      this.error2 = data["error"].errors.type.message
      this.error3 = data["error"].errors.description.message
      //this._router.navigate(['/addpet'])
      }
    });
    //this._router.navigate(['/'])
  }



  
}
