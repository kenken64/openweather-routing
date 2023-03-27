import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../model/city';
import { Weather } from '../model/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  countries = [
    { country: 'Singapore', city: 'Singapore'},
    { country: 'United Kingdom', city: 'London'},
    { country: 'Malaysia', city: 'Kuala Lumpur'},
    { country: 'China', city: 'Beijing'},
    { country: 'India', city: 'New Delhi'}, 
  ]

  imageBasedCity = [
    {city: 'Singapore', imageUrl: 'https://bit.ly/3nqmL4p'},
    {city: 'London', imageUrl: 'https://bit.ly/3ZkaziU'},
    {city: 'Kuala Lumpur', imageUrl: 'https://bit.ly/40hW28X'},
    {city: 'Beijing', imageUrl: 'https://bit.ly/3lHoUZh'},
    {city: 'New Delhi', imageUrl: 'https://bit.ly/3JOLdnE'},
    
  ]
  constructor(private httpClient: HttpClient) { }

  //https://api.openweathermap.org/data/2.5/weather?q=<city>&appid=<API key>
  getWeather(city: string, apiKey: string): Promise<any>{
    console.log("get weather");
    const params = new HttpParams()
        .set("q", city)
        .set("appid", apiKey);

    return lastValueFrom(this.httpClient
        .get("https://api.openweathermap.org/data/2.5/weather", {params: params}));
  }

  getCityUrl(city: string){
    const w = this.imageBasedCity.find(v => v.city == city);
    console.log(w);
    return w;
  }

  addCity(city: City){
    this.countries.push({country: city.country, city: city.city});
    this.countries.sort((a,b)=> (a.country > b.country)? 1 : -1);
    this.imageBasedCity.push({city: city.city, imageUrl: city.imageUrl})
    
  }
}
