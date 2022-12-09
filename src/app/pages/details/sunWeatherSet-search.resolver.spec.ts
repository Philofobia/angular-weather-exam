import { TestBed } from '@angular/core/testing';

import { SunWeatherSearchResolver } from './sunWeatherSet-search.resolver';

describe('WeatherSearchResolver', () => {
  let resolver: SunWeatherSearchResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SunWeatherSearchResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
