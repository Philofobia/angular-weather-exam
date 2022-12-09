import { fullWeatherAns, weatherAns } from './models';

export const handleWeatherApi = (weather: weatherAns): fullWeatherAns => {
  const cloud = weather.cloudCover;
  const humidity = weather.humidity;
  const windSpeed = weather.windSpeed;
  const liftedIndex = weather.liftedIndex;
  const precipation = weather.precipation;
  const currentTime = new Date().getTime();

  let image: string = '';
  let wthDescription: string = '';
  let humidityPerc: string = '';
  let windSpeedStr: string = '';

  //WEATHER
  if (precipation === 'none') {
    if (humidity >= 14 && cloud < 6) {
      image = 'assets/weather_fog.png';
      wthDescription = 'Foggy';
    } else {
      if (cloud <= 2) {
        image = 'assets/weather_clear.png';
        wthDescription = 'Clear Sky';
      } else if (cloud >= 3 && cloud <= 5) {
        image = 'assets/weather_pcloudy.png';
        wthDescription = 'Partyally Cloudy';
      } else if (cloud >= 6 && cloud <= 7) {
        image = 'assets/weather_cloudy.png';
        wthDescription = 'Cloudy';
      } else {
        if (liftedIndex <= -4) {
          image = 'assets/weather_tstorm.png';
          wthDescription = 'Thunderstorm Possible';
        } else {
          image = 'assets/weather_vcloudy.png';
          wthDescription = 'Very Cloudy';
        }
      }
    }
  } else if (precipation === 'rain') {
    if (liftedIndex <= -4) {
      image = 'assets/weather_tsrain.png';
      wthDescription = 'Thunderstorm';
    } else {
      image = 'assets/weather_rain.png';
      wthDescription = 'Rain';
    }
  } else if (precipation === 'snow') {
    image = 'assets/weather_snow.png';
    wthDescription = 'Snow';
  } else if (precipation === 'frzr' || precipation === 'icep') {
    image = 'assets/weather_rainsnow.png';
    if (precipation === 'frzr') {
      wthDescription = 'Freezing Rain';
    } else if (precipation === 'icep') {
      wthDescription === 'Ice Pellets';
    }
  }

  windSpeedStr = adjustWindSpeed(windSpeed);
  humidityPerc = adjustHumidity(humidity);
  weather.time = currentTime + weather.time * 60 * 60 * 1000;

  const fullWeather: fullWeatherAns = {
    ...weather,
    image,
    wthDescription,
    humidityPerc,
    windSpeedStr,
  };
  return fullWeather;
};

const adjustWindSpeed = (windSpeed: number) => {
  let windSpeedStr: string = '';

  switch (windSpeed) {
    case 1:
      windSpeedStr = 'Below 0.3m/s - Calm';
      break;
    case 2:
      windSpeedStr = '0.3-3.4m/s - Light';
      break;
    case 3:
      windSpeedStr = '3.4-8.0m/s - Moderate';
      break;
    case 4:
      windSpeedStr = '8.0-10.8m/s - Fresh';
      break;
    case 5:
      windSpeedStr = '10.8-17.2m/s - Strong';
      break;
    case 6:
      windSpeedStr = '17.2-24.5m/s - Gale';
      break;
    case 7:
      windSpeedStr = '24.5-32.6m/s - Storm';
      break;
    case 8:
      windSpeedStr = 'Over 32.6m/s - Hurricane';
      break;
  }
  return windSpeedStr;
};

const adjustHumidity = (humidity: number) => {
  let humidityPerc: string = '';
  switch (humidity) {
    case -4:
      humidityPerc = '0%-5%';
      break;
    case -3:
      humidityPerc = '5%-10%';
      break;
    case -2:
      humidityPerc = '10%-15%';
      break;
    case -1:
      humidityPerc = '15%-20%';
      break;
    case 0:
      humidityPerc = '20%-25%';
      break;
    case 1:
      humidityPerc = '25%-30%';
      break;
    case 2:
      humidityPerc = '30%-35%';
      break;
    case 3:
      humidityPerc = '35%-40%';
      break;
    case 4:
      humidityPerc = '40%-45%';
      break;
    case 5:
      humidityPerc = '45%-50%';
      break;
    case 6:
      humidityPerc = '50%-55%';
      break;
    case 7:
      humidityPerc = '55%-60%';
      break;
    case 8:
      humidityPerc = '60%-65%';
      break;
    case 9:
      humidityPerc = '65%-70%';
      break;
    case 10:
      humidityPerc = '70%-75%';
      break;
    case 11:
      humidityPerc = '75%-80%';
      break;
    case 12:
      humidityPerc = '80%-85%';
      break;
    case 13:
      humidityPerc = '85%-90%';
      break;
    case 14:
      humidityPerc = '90%-95%';
      break;
    case 15:
      humidityPerc = '95%-99%';
      break;
    case 16:
      humidityPerc = '100%';
      break;
  }
  return humidityPerc;
};
