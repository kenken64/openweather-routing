import { Injectable } from "@angular/core";
import Dexie, { Table } from "dexie";
import { City } from "../model/city";

@Injectable({
    providedIn: 'root'
})
export class CitiesRepository extends Dexie{
    city!: Dexie.Table<City, string>

    constructor(){
        super('citiesdb');
        this.version(1).stores({
            city: 'city'
        })
        this.city = this.table('city');
    }

    addCity(city: City): Promise<string> {
        return this.city.add(city);
    }

    async getAllCities() : Promise<City[]>{
        const cities  = await this.city.orderBy('city').toArray();
        return cities;
    }

    async getCityImageUrl(city: string) : Promise<any> {
        const cityResult = await this.city.get(city);
        return cityResult?.imageUrl;
    }
}