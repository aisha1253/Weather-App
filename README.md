# WeatherNow

A weather forecast web app built with React. Search any city and get current conditions plus a 5-day forecast.

Live demo: [your-vercel-url-here]

---

## What it does

- Search any city in the world and get real-time weather data
- Auto-suggestions appear as you type so you find the right city fast
- Shows current temperature, humidity, wind speed, and feels-like
- 5-day forecast with daily high/low temperatures
- URL updates per city — so `/weather/london` or `/weather/karachi` loads directly
- Works on mobile and desktop

---

## Tech used

- React 18 with Vite
- React Router v6 for dynamic routing
- Axios for API calls
- OpenWeatherMap API (current weather + forecast + geocoding)
- Tailwind CSS for styling
- Deployed on Vercel

---

## Project structure

```
src/
├── components/
│   ├── SearchBar.jsx      # Search input with debounced suggestions
│   ├── WeatherCard.jsx    # Current weather display
│   ├── ForecastCard.jsx   # 5-day forecast row
│   └── Loader.jsx         # Loading spinner
├── pages/
│   ├── Home.jsx           # Landing page with search
│   └── WeatherPage.jsx    # Weather detail page
├── hooks/
│   └── useWeather.js      # Custom hook for fetching weather data
└── services/
    └── weatherApi.js      # All OpenWeatherMap API calls
```

---

## Running locally

You'll need a free API key from [openweathermap.org](https://openweathermap.org).

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
npm install
```

Create a `.env` file in the root:

```
VITE_WEATHER_API_KEY=your_api_key_here
```

Then start the dev server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## How the routing works

Each city gets its own URL. If you go directly to `/weather/tokyo` it loads that city's weather without needing to search first. This is handled with React Router's `useParams` hook pulling the city name from the URL and passing it to the weather API.

For Vercel deployment, a `vercel.json` rewrite rule makes sure these URLs work even on direct load or page refresh:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## API overview

Three endpoints from OpenWeatherMap are used:

- `/data/2.5/weather` — current weather for a city
- `/data/2.5/forecast` — 5-day forecast in 3-hour intervals (filtered to one per day)
- `/geo/1.0/direct` — city name to coordinates, used for search suggestions

All calls go through `weatherApi.js` and the data is managed by the `useWeather` custom hook.

---

## Deploying

Push to GitHub, import the repo on Vercel, add `VITE_WEATHER_API_KEY` as an environment variable, and deploy. That's it.