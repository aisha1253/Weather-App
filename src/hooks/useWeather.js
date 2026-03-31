import { useState, useEffect } from 'react';
import { getCurrentWeather, getForecast } from '../services/weatherApi';

export const useWeather = (city) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (city === '') {
      setLoading(false);
      return;
    }

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const [weather, forecast] = await Promise.all([
          getCurrentWeather(city),
          getForecast(city),
        ]);

        setWeatherData(weather);
        setForecastData(forecast);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weatherData, forecastData, loading, error };
};
