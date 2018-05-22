import { HttpService } from './../http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  pets: any;

  constructor(private _HttpService: HttpService) { }
  ngOnInit() {
    this.getPetsTable();
    console.log("Pets Work")
  }

  getPetsTable() {
    console.log("Pets table loading")
    let petObservable = this._HttpService.getPets();
    petObservable.subscribe(data => {
      console.log("Pets table loaded");
      this.pets = data;
    })
  }

}
