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
      if (!response.ok) {
        throw new Error("Failed to fetch geocode data");
      }
      return await response.json();
    } catch (error) {
      console.error("Geocoding failure:", error);
      return null;
    }
  };
}

export default GeocodeService;
