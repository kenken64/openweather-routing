import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-listcity',
  templateUrl: './listcity.component.html',
  styleUrls: ['./listcity.component.css']
})
export class ListcityComponent implements OnInit{
  cities: any;

  constructor(private weatherSvc: WeatherService){

  }

  ngOnInit(): void {
      this.cities = this.weatherSvc.countries;
  }
}
