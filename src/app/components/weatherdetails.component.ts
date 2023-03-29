import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Weather } from '../model/weather';
import { CitiesRepository } from '../services/cities.repo';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weatherdetails',
  templateUrl: './weatherdetails.component.html',
  styleUrls: ['./weatherdetails.component.css']
})
export class WeatherdetailsComponent implements OnInit, OnDestroy{
  OPENWEATHER_API_KEY= environment.openWeatherApiKey;
  private city: string = "Singapore";
  private country?: string;
  private imageUrl?: string;
  params$ ! : Subscription;
  model = new Weather("Singapore", 0,0,0,"", "", 0,0 );

  constructor(private weatherSvc: WeatherService, private router:Router,
      private activatedRoute: ActivatedRoute, private citiesRepo: CitiesRepository)
  {}

  ngOnInit(): void {
      this.params$ = this.activatedRoute.params.subscribe(
        (params) => {
          this.city = params['city'];
        }
      );
      this.getWeatherFromAPI(this.city);
  }

  ngOnDestroy(){
    this.params$.unsubscribe();
  }

  getWeatherFromAPI(city: string){
    this.weatherSvc.getWeather(city, this.OPENWEATHER_API_KEY)
      .then( async (result) => {  
          const cityImageUrl = await this.citiesRepo
                      .getCityImageUrl(city);
          console.log(cityImageUrl);
          this.model= new Weather(
            city,
            result.main.temp,
            result.main.pressure,
            result.main.humidity,
            result.weather[0].description,
            cityImageUrl,
            result.wind.degree,
            result.wind.speed

          )
      }).catch((err)=> {
        console.log(err);
        this.router.navigate([''])
      })
  }
}
