import { inject, Injectable } from '@angular/core';
import { Country } from '../models/countries.model';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);
  API_KEY = '1890fcd579ac51bb12f42af3ceed6428';
  getCountries(): Observable<Country[]> {
    return this.http
      .get<{ data: Country[] }>(
        'https://countriesnow.space/api/v0.1/countries/iso'
      )
      .pipe(map((res) => res.data));
  }

  getCities(country: string): Observable<string[]> {
    const data = {
      country: country,
    };
    return this.http
      .post<{ data: string[] }>(
        'https://countriesnow.space/api/v0.1/countries/cities',
        data
      )
      .pipe(map((res) => res.data));
  }

  getWeather(city: string, iso: string): Observable<any> {
    return this.http.get<any>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${iso}&units=metric&appid=${this.API_KEY}`
    );
  }
}
