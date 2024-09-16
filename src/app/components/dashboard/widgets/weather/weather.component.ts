import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherInfo } from '../../../../models/weathe-info.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent {
  // private http = inject(HttpClient);

  // getCities = (country: string): Observable<string[]> => {
  //   this.http.get('https://countriesnow.space/api/v0.1/countries/cities');
  // };
  // getWeather$ = (city: City): Observable<WeatherInfo> =>
  //   this.http.get<WeatherInfo>(
  //     `https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&units=metric&appid=${API_KEY}`
  //   );
}
