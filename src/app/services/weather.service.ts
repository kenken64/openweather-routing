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

  constructor(private httpClient: HttpClient) { }

  getWeather(city: string, apiKey: string): Promise<any>{
    console.log("get weather");
    const params = new HttpParams()
        .set("q", city)
        .set("appid", apiKey);

    return lastValueFrom(this.httpClient
        .get("https://api.openweathermap.org/data/2.5/weather", {params: params}));
  }
}
