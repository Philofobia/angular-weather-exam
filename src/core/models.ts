//SUNRISE-SUNSET API
export interface sunPositionApi {
  results: {
    sunrise: string;
    sunset: string;
    first_light: string;
    last_light: string;
    dawn: string;
    dusk: string;
  };
}

export interface sunPosition {
  sunrise: string;
  sunset: string;
  first_light: string;
  last_light: string;
  dawn: string;
  dusk: string;
}
//WEATHER API
export interface weatherApi {
  dataseries: {
    timepoint: number;
    cloudcover: number;
    lifted_index: number;
    rh2m: number;
    wind10m: {
      direction: string;
      speed: number;
    };
    temp2m: number;
    prec_type: string;
  }[];
}

export interface weatherAns {
  time: number;
  cloudCover: number;
  humidity: number;
  liftedIndex: number;
  windDirection: string;
  windSpeed: number;
  temperature: number;
  precipation: string;
}

export interface fullWeatherAns extends weatherAns {
  image: string;
  wthDescription: string;
  humidityPerc: string;
  windSpeedStr: string;
}

//FORKJOIN RESOLVER
export interface weatherSunResolverAnswer {
  sun: sunPosition;
  weather: weatherAns[];
}
