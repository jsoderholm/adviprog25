import env from "../env";

class GeocodeService {
  public coordinatesFromText = async (text: string) => {
    const response = await fetch(
      `https://geocode.maps.co/search?q=${encodeURIComponent(text)}`,
      {
        headers: {
          Authorization: `Bearer ${env.GEOCODING_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    if (data && data.length > 0) {
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    } else {
      console.error(
        "Geocoding failure: No data found for the given search query"
      );
    }
    return null;
  };
}

export default GeocodeService;
