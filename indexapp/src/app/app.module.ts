import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PetsComponent } from './pets/pets.component';
import { AppComponent } from './app.component';
import { AddpetComponent } from './addpet/addpet.component';
import { EditComponent } from './edit/edit.component';
import { PetdetailsComponent } from './petdetails/petdetails.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PetsComponent,
    AddpetComponent,
    EditComponent,
    PetdetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
