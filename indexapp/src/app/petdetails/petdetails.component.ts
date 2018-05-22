import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-petdetails',
  templateUrl: './petdetails.component.html',
  styleUrls: ['./petdetails.component.css']
})
export class PetdetailsComponent implements OnInit {
  editsId: any;
  pet: any;
  editsObject: any;
  boolean = true;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.pet = {
      "name": "",
      "type": "",
      "description": "",
      "skill1": "",
      "skill2": "",
      "skill3": "",
  }
    this.editsObject = {
      "name": "",
      "type": "",
      "description": "",
      "skill1": "",
      "skill2": "",
      "skill3": "",
  }
    this._route.params.subscribe((params: Params) => {
      this.editsId = params['id'];
    });
    this.loadPet();
  }

  loadPet() {
    let PetObservable = this._httpService.getOnePet(this.editsId);
    PetObservable.subscribe(data => {
      this.pet = data;
    });
  }
  editPet(){
    let PetObservable = this._httpService.editServicePet(this.editsObject);
    console.log("Attempting to edit", this.editsObject )
    PetObservable.subscribe(data => {
      console.log("Editing Pet")
      this._router.navigate(['/'])
    })
  }
  deletePet(PetID) {
    console.log("Starting pet delete", PetID);
    let theresult = this._httpService.httpDeletePet(PetID);
    theresult.subscribe(data => {
      console.log("Deleting pet");
      console.log(data);
      this._router.navigate(['/'])
    })
  }

  like() {
    this.pet.likes += 1
    this.boolean = false;
    let PetObservable = this._httpService.editServicePet(this.pet);
    PetObservable.subscribe(data => {
    })
  }
}

