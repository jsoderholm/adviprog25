import env from "../env";

class GeocodeService {
  public coordinatesFromText = async (text: string) => {
    try {
      const response = await fetch(
        `https://geocode.maps.co/search?q=${encodeURIComponent(text)}`,
        {
          headers: {
            Authorization: `Bearer ${env.GEOCODING_API_KEY}`,
          },
        },
      );
      const data = await response.json();
      if (data && data.length > 0) {
        return data;
      } else {
        console.error(
          "Geocoding failure: No data found for the given search query",
        );
        return null;
      }
    } catch (error) {
      console.error("Geocoding failure:", error);
      return null;
    }
  };
}

export default GeocodeService;
