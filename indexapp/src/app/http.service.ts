import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getPets(){
    console.log("Got Pets Page");
    return this._http.get('/pet');
  }
    
  addServicePet(newPet) {
    console.log("Added New Pet")
    return this._http.post("/addpet", newPet);
  }
  
  httpDeletePet(PetID) {
    console.log("we are going to delete this pet", PetID);
    let routePath = '/pet/' + PetID
    let message = this._http.delete(routePath);
    return message
  }
  editServicePet(input) {
    console.log("Entering edit Pet function")
    return this._http.put("/pet/" + input._id + "/edit", input)
  }

  getOnePet(theirID){
    console.log("Got ID" + theirID);
    let routePath = ('/pet/' + theirID);
    return this._http.get(routePath);
  }


  

}

