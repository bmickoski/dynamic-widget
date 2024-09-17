import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { exhaustMap, filter, Observable, tap } from 'rxjs';
import {
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent,
} from '@ng-select/ng-select';
import { Country } from '../../../../models/countries.model';
import { WeatherService } from '../../../../services/weather.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherInfo } from '../../../../models/weather-info.model';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent,
    AsyncPipe,
    FormsModule,
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent implements OnInit {
  private weatherService = inject(WeatherService);
  countries$!: Observable<Country[]>;
  cities$!: Observable<string[]>;
  selectedCountry = signal<Country | null>(null);
  selectedCity = signal<string | null>(null);
  weatherInfo = signal<WeatherInfo | null>(null);
  // weatherInfo!: WeatherInfo;
  // selectedCountry: Country | null = null;
  // selectedCity: string | null = null;
  ngOnInit(): void {
    this.countries$ = this.weatherService.getCountries();
  }

  weather = computed(() => {
    if (this.selectedCity() && this.selectedCountry()) {
      // this.weatherService
      //   .getWeather(
      //     this.selectedCity() as string,
      //     (this.selectedCountry() as Country).Iso2
      //   )
      //   .subscribe((res) => {
      //     this.weatherInfo = res;
      //     console.log(this.weather());
      //   });
    }
  });

  onCountry(): void {
    this.selectedCity.set(null);
    this.cities$ = this.weatherService.getCities(
      (this.selectedCountry() as Country).name
    );
  }

  weaterInfo$ = toObservable<string>(
    this.selectedCity as WritableSignal<string>
  ).pipe(
    // Make api call only when we have selected city
    filter((city) => (city ? true : false)),
    tap((city) => console.log('selected city', city)),
    exhaustMap(
      (
        city // Don't execute the http request if one is already in progress
      ) =>
        this.weatherService
          .getWeather(city, (this.selectedCountry() as Country).Iso2)
          .pipe(tap((info) => this.weatherInfo.set(info)))
    )
  );
}
