import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org';

const weatherApi = axios.create({
  baseURL: BASE_URL,
});

export const getCurrentWeather = async (city) => {
  try {
    const response = await weatherApi.get('/data/2.5/weather', {
      params: {
        q: city,
        units: 'metric',
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('City not found');
    }
    throw new Error('API error');
  }
};

export const getForecast = async (city) => {
  try {
    const response = await weatherApi.get('/data/2.5/forecast', {
      params: {
        q: city,
        units: 'metric',
        appid: API_KEY,
      },
    });
    const filteredList = response.data.list.filter((_, index) => index % 8 === 0);
    return filteredList;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('City not found');
    }
    throw new Error('API error');
  }
};

export const getCitySuggestions = async (query) => {
  try {
    const response = await weatherApi.get('/geo/1.0/direct', {
      params: {
        q: query,
        limit: 5,
        appid: API_KEY,
      },
    });
    const suggestions = response.data.map((city) => ({
      name: city.name,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
    }));
    return suggestions;
  } catch (error) {
    throw new Error('API error');
  }
};
