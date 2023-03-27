import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcityComponent } from './components/addcity.component';
import { ListcityComponent } from './components/listcity.component';
import { WeatherdetailsComponent } from './components/weatherdetails.component';

const routes: Routes = [
  {path:'', component:ListcityComponent },
  {path: 'add-city', component: AddcityComponent},
  {path: 'weather/:city', component: WeatherdetailsComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
