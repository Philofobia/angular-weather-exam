import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { forkJoin, map, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { weatherSunResolverAnswer } from 'src/core/models';

@Injectable({
  providedIn: 'root'
})
export class SunWeatherSearchResolver implements Resolve<weatherSunResolverAnswer> {
  constructor(private apiService: ApiService){}
  resolve(route: ActivatedRouteSnapshot): Observable<weatherSunResolverAnswer> {
    return forkJoin([ 
      this.apiService.getSunriseSetByPosition(+(route.paramMap.get('lat')!), +(route.paramMap.get('lng')!)),
      this.apiService.getWeatherPosition(+(route.paramMap.get('lat')!), +(route.paramMap.get('lng')!))
    ]).pipe(map((res) => {
      return {
        sun: res[0],
        weather: res[1]
      }
    }))
  }
}
