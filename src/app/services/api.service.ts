import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, withLatestFrom } from 'rxjs';
import { handleWeatherApi } from 'src/core/logicFunctions';
import {
  fullWeatherAns,
  sunPosition,
  sunPositionApi,
  weatherAns,
  weatherApi,
} from 'src/core/models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  BASE_URL_sunrisesunset = 'https://api.sunrisesunset.io';
  BASE_URL_weather = 'https://www.7timer.info/bin';
  constructor(private httpClient: HttpClient) {}
  // FOR THE SUN
  getSunriseSetByPosition = (lat: number, lng: number) => {
    return this.httpClient
      .get<sunPositionApi>(
        `${this.BASE_URL_sunrisesunset}/json?lat=${lat}&lng=${lng}&timezone=UTC&date=today`
      )
      .pipe(
        map((res) => {
          const cleanSunPositionApi = res.results;
          const sunPosition: sunPosition = {
            sunrise: cleanSunPositionApi.sunrise,
            sunset: cleanSunPositionApi.sunset,
            first_light: cleanSunPositionApi.first_light,
            last_light: cleanSunPositionApi.last_light,
            dawn: cleanSunPositionApi.dawn,
            dusk: cleanSunPositionApi.dusk,
          };
          return sunPosition;
        })
      );
  };
  // FOR THE WEATHER
  getWeatherPosition = (lat: number, lng: number) => {
    return this.httpClient
      .get<weatherApi>(
        `${this.BASE_URL_weather}/astro.php?lon=${lng}&lat=${lat}&ac=0&unit=metric&output=json&tzshift=0`
      )
      .pipe(
        map((res) => {
          const cleanWeatherApi = res.dataseries;
          const weather: weatherAns[] = cleanWeatherApi.map((el) => ({
            time: el.timepoint,
            cloudCover: el.cloudcover,
            humidity: el.rh2m,
            liftedIndex: el.lifted_index,
            windDirection: el.wind10m.direction,
            windSpeed: el.wind10m.speed,
            temperature: el.temp2m,
            precipation: el.prec_type,
          }));
          const fullWeather: fullWeatherAns[] = weather.map((el) =>
            handleWeatherApi(el)
          );
          return fullWeather;
        })
      );
  };
}
