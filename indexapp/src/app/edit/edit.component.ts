import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpService } from './../http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editsId: any;
  pet: any;
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
      "skill3": ""
    }

    this._route.params.subscribe((params: Params) => {
      this.editsId = params['id'];
    });
    console.log("We have loaded here")
    this.loadPet(this.editsId);
  }

  loadPet(id) {
    let petObservable = this._httpService.getOnePet(id);
    petObservable.subscribe(data => {
      console.log(data)
      this.pet = data;
    });
  }
  editPet() {
    let petObservable = this._httpService.editServicePet(this.pet);
    console.log("Attempting to edit", this.pet)
    petObservable.subscribe(data => {
      console.log("Editing Pet")
      this._router.navigate(['/'])
    })
  }
}