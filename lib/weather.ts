export type WeatherData = {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
  isMock: boolean;
};

type OpenWeatherResponse = {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
  }>;
  wind: {
    speed: number;
  };
};

const mockConditions = ["Partly cloudy", "Sunny", "Light breeze", "Clear skies"];

function getMockWeather(city: string): WeatherData {
  const citySeed = city.split("").reduce((total, char) => total + char.charCodeAt(0), 0);

  return {
    temperature: 65 + (citySeed % 18),
    condition: mockConditions[citySeed % mockConditions.length],
    humidity: 45 + (citySeed % 35),
    windSpeed: 4 + (citySeed % 9),
    location: city,
    isMock: true,
  };
}

export async function fetchCurrentWeather(params: {
  latitude: number;
  longitude: number;
  city: string;
}): Promise<WeatherData> {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  if (!apiKey) {
    await new Promise((resolve) => setTimeout(resolve, 450));
    return getMockWeather(params.city);
  }

  const endpoint = new URL("https://api.openweathermap.org/data/2.5/weather");
  endpoint.searchParams.set("lat", String(params.latitude));
  endpoint.searchParams.set("lon", String(params.longitude));
  endpoint.searchParams.set("appid", apiKey);
  endpoint.searchParams.set("units", "imperial");

  const response = await fetch(endpoint.toString());

  if (!response.ok) {
    throw new Error("Unable to load current weather. Please try again later.");
  }

  const data = (await response.json()) as OpenWeatherResponse;

  return {
    temperature: Math.round(data.main.temp),
    condition: data.weather[0]?.description ?? "Weather unavailable",
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed),
    location: data.name || params.city,
    isMock: false,
  };
}
