import { Component, OnInit } from '@angular/core';
import { CitiesRepository } from '../services/cities.repo';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-listcity',
  templateUrl: './listcity.component.html',
  styleUrls: ['./listcity.component.css']
})
export class ListcityComponent implements OnInit{
  cities: any;

  constructor(private citiesRepo: CitiesRepository){

  }

  async ngOnInit() {
      this.cities = await this.citiesRepo.getAllCities();
      console.log(this.cities);
      
  }
}
