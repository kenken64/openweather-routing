import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from '../model/city';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-addcity',
  templateUrl: './addcity.component.html',
  styleUrls: ['./addcity.component.css']
})
export class AddcityComponent implements OnInit, OnDestroy{
  form!: FormGroup;
  countryName?: string;
  city? : string;
  imageUrl? : string;
  cityObj?: City;

  constructor(private formBuilder: FormBuilder, private router: Router,
      private weatherSvc: WeatherService){
    
  }

  ngOnInit(): void {
      this.form = this.createForm();
  }

  ngOnDestroy(): void {
      
  }

  add(){
    const countryName = this.form?.value['countryName'];
    const city = this.form?.value['city'];
    const imageUrl = this.form?.value['imageUrl'];
    this.cityObj = { country: countryName, city: city, imageUrl: imageUrl};
    this.weatherSvc.addCity(this.cityObj);
    this.router.navigate(['/']);
  }

  private createForm(): FormGroup{
    return this.formBuilder.group({
      countryName : this.formBuilder.control(''),
      city : this.formBuilder.control(''),
      imageUrl : this.formBuilder.control(''),
      
    })
  }
}
