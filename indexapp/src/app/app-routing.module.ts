import { PetdetailsComponent } from './petdetails/petdetails.component';
import { AddpetComponent } from './addpet/addpet.component';
import { PetsComponent } from './pets/pets.component';
import { EditComponent } from './edit/edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'pets', pathMatch: 'full'},
  { path: 'pets', component: PetsComponent },
  { path: 'addpet', component: AddpetComponent },
  { path: 'pets/:id', component: PetdetailsComponent },
  { path: 'pets/:id/edit', component: EditComponent }
];

@NgModule({

  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],

  exports: [RouterModule],
  declarations: [],

})
export class AppRoutingModule { }
