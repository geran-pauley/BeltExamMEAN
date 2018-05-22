import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'the Pet Shelter!';
  mainPetCollection: any;

  constructor(private _httpService: HttpService) {

  }
  showPets() {
    let PetObservable = this._httpService.getPets();
    PetObservable.subscribe(data => {
      console.log(`This is the data you are looking at: ${data}`);
      this.mainPetCollection = data;
    });
  }
}