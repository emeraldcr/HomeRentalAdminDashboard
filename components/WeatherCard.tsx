"use client";

import { useEffect, useState } from "react";
import { fetchCurrentWeather, type WeatherData } from "@/lib/weather";
import { ErrorState } from "./ErrorState";
import { LoadingState } from "./LoadingState";

type WeatherCardProps = {
  city: string;
  latitude: number;
  longitude: number;
};

export function WeatherCard({ city, latitude, longitude }: WeatherCardProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadWeather() {
      setIsLoading(true);
      setError("");

      try {
        const currentWeather = await fetchCurrentWeather({ city, latitude, longitude });

        if (isMounted) {
          setWeather(currentWeather);
        }
      } catch (weatherError) {
        if (isMounted) {
          setError(weatherError instanceof Error ? weatherError.message : "Unable to load weather.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadWeather();

    return () => {
      isMounted = false;
    };
  }, [city, latitude, longitude]);

  if (isLoading) {
    return <LoadingState message="Loading current weather..." />;
  }

  if (error) {
    return <ErrorState title="Weather unavailable" message={error} />;
  }

  if (!weather) {
    return <ErrorState title="Weather unavailable" message="No weather data was returned." />;
  }

  return (
    <section className="weather-card" aria-label={`Current weather for ${weather.location}`}>
      <div className="weather-card__header">
        <div>
          <p className="eyebrow">Current weather</p>
          <h2>{weather.location}</h2>
        </div>
        {weather.isMock ? <span className="mock-pill">Mock fallback</span> : null}
      </div>
      <div className="weather-card__temp">
        <span>{weather.temperature}°F</span>
        <p>{weather.condition}</p>
      </div>
      <dl className="weather-card__metrics">
        <div>
          <dt>Humidity</dt>
          <dd>{weather.humidity}%</dd>
        </div>
        <div>
          <dt>Wind</dt>
          <dd>{weather.windSpeed} mph</dd>
        </div>
      </dl>
      {weather.isMock ? (
        <p className="weather-note">Add an OpenWeatherMap API key to use live weather data.</p>
      ) : null}
    </section>
  );
}
