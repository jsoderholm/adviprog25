import GeocodeService from "./services/geocode.service";
import WeatherService from "./services/weather.service";

const geocodeService = new GeocodeService();

export const weatherService = new WeatherService(geocodeService);
