import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
/** Dev proxy avoids browser CORS issues with the Geo API; production calls OWM directly. */
const BASE_URL = import.meta.env.DEV ? '/api/owm' : 'https://api.openweathermap.org';

const weatherApi = axios.create({
  baseURL: BASE_URL,
});

const formatAxiosError = (error, fallback) => {
  if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
    return 'Network error. Check your connection and try again.';
  }
  const status = error.response?.status;
  if (status === 401) {
    return 'Invalid or missing API key. Set VITE_WEATHER_API_KEY in .env and restart the dev server.';
  }
  if (status === 404) {
    return fallback ?? 'No data found.';
  }
  if (status === 429) {
    return 'Too many requests. Wait a moment and try again.';
  }
  const msg = error.response?.data?.message;
  if (typeof msg === 'string' && msg.trim()) return msg;
  return fallback ?? 'Something went wrong. Please try again.';
};

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
    throw new Error(
      formatAxiosError(error, 'City not found. Check spelling or pick a city from suggestions.'),
    );
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
    throw new Error(
      formatAxiosError(error, 'City not found. Check spelling or pick a city from suggestions.'),
    );
  }
};

export const getCitySuggestions = async (query) => {
  try {
    const encodedQuery = encodeURIComponent(query.trim());
    const response = await weatherApi.get('/geo/1.0/direct', {
      params: {
        q: encodedQuery,
        limit: 5,
        appid: API_KEY,
      },
      paramsSerializer: (params) =>
        `q=${params.q}&limit=${params.limit}&appid=${params.appid}`,
    });
    const data = response.data;
    if (!Array.isArray(data)) {
      return [];
    }
    return data.map((city) => {
      const label = [city.name, city.state, city.country].filter(Boolean).join(', ');
      return {
        name: city.name,
        state: city.state,
        country: city.country,
        lat: city.lat,
        lon: city.lon,
        label,
        weatherQuery: `${city.name},${city.country}`,
      };
    });
  } catch (error) {
    throw new Error(formatAxiosError(error, 'Could not load city suggestions.'));
  }
};
