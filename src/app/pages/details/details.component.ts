import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';
import { fullWeatherAns, sunPosition } from 'src/core/models';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  searchedSun: sunPosition | null = null;
  searchedWeather: fullWeatherAns[] = [];
  latitude: string = '';
  longitude: string = '';
  time: Date = new Date();
  constructor(
    private route: ActivatedRoute,
    private navigation: NavigationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.latitude = params.get('lat')!;
      this.longitude = params.get('lat')!;
    });
    this.route.data.subscribe(({ sunWeather }) => {
      this.searchedSun = sunWeather.sun;
      this.searchedWeather = sunWeather.weather;
    });
  }

  back(): void {
    this.navigation.back();
  }
}
