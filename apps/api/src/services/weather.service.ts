import { fetchWeatherApi } from "openmeteo";

class WeatherService {
  private makeArray = (float32Array: Float32Array | null) => {
    return float32Array ? Array.from(float32Array) : null;
  };

  public getWeatherFromCoordinates = async (lat: number, lon: number) => {
    const params = {
      latitude: lat,
      longitude: lon,
      daily: [
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_sum",
        "precipitation_hours",
        "precipitation_probability_max",
        "sunrise",
        "sunset",
        "wind_speed_10m_max",
      ],
      hourly: ["temperature_2m", "uv_index"],
      current: [
        "relative_humidity_2m",
        "apparent_temperature",
        "wind_speed_10m",
        "wind_direction_10m",
        "precipitation",
        "temperature_2m",
        "is_day",
        "wind_gusts_10m",
        "rain",
        "showers",
        "snowfall",
        "cloud_cover",
      ],
      timezone: "Europe/Berlin",
    };

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    if (!responses || responses.length === 0) {
      console.error("Weather API failure: No response received");
      return null;
    }
    const response = responses[0];

    // Attributes for location
    const locationData = {
      latitude: response.latitude(),
      longitude: response.longitude(),
      elevation: response.elevation(),
      timezone: response.timezone(),
      timezoneAbbreviation: response.timezoneAbbreviation(),
      utcOffsetSeconds: response.utcOffsetSeconds(),
    };

    // Attributes for weather data
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current()!;
    const hourly = response.hourly()!;
    const daily = response.daily()!;
    const sunrise = daily.variables(5)!;
    const sunset = daily.variables(6)!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
      current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        relative_humidity_2m: current.variables(0)!.value(),
        apparent_temperature: current.variables(1)!.value(),
        wind_speed_10m: current.variables(2)!.value(),
        wind_direction_10m: current.variables(3)!.value(),
        precipitation: current.variables(4)!.value(),
        temperature_2m: current.variables(5)!.value(),
        is_day: current.variables(6)!.value(),
        wind_gusts_10m: current.variables(7)!.value(),
        rain: current.variables(8)!.value(),
        showers: current.variables(9)!.value(),
        snowfall: current.variables(10)!.value(),
        cloud_cover: current.variables(11)!.value(),
      },
      hourly: {
        time: [
          ...Array(
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
              hourly.interval()
          ),
        ].map(
          (_, i) =>
            new Date(
              (Number(hourly.time()) +
                i * hourly.interval() +
                utcOffsetSeconds) *
                1000
            )
        ),
        temperature_2m: this.makeArray(hourly.variables(0)!.valuesArray()),
        uv_index: this.makeArray(hourly.variables(1)!.valuesArray()),
      },
      daily: {
        time: [
          ...Array(
            (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval()
          ),
        ].map(
          (_, i) =>
            new Date(
              (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
                1000
            )
        ),
        temperature_2m_max: this.makeArray(daily.variables(0)!.valuesArray()),
        temperature_2m_min: this.makeArray(daily.variables(1)!.valuesArray()),
        precipitation_sum: this.makeArray(daily.variables(2)!.valuesArray()),
        precipitation_hours: this.makeArray(daily.variables(3)!.valuesArray()),
        precipitation_probability_max: this.makeArray(
          daily.variables(4)!.valuesArray()
        ),
        // Map Int64 values to according structure
        sunrise: [...Array(sunrise.valuesInt64Length())].map(
          (_, i) =>
            new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
        ),
        // Map Int64 values to according structure
        sunset: [...Array(sunset.valuesInt64Length())].map(
          (_, i) =>
            new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
        ),
        wind_speed_10m_max: this.makeArray(daily.variables(7)!.valuesArray()),
      },
    };
    return { location: locationData, weather: weatherData };
  };
}

export default WeatherService;
