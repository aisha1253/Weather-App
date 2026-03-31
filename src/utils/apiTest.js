import { getCurrentWeather, getForecast, getCitySuggestions } from '../services/weatherApi.js';

const runApiTests = async () => {
  let passed = 0;
  const total = 3;

  // Test 1: getCurrentWeather
  try {
    const weather = await getCurrentWeather('London');
    console.log(`✅ getCurrentWeather PASSED - Temp: ${weather.main.temp}°C, City: ${weather.name}`);
    passed++;
  } catch (error) {
    console.log(`❌ getCurrentWeather FAILED - ${error.message}`);
  }

  // Test 2: getForecast
  try {
    const forecast = await getForecast('London');
    console.log(`✅ getForecast PASSED - Days returned: ${forecast.length}`);
    passed++;
  } catch (error) {
    console.log(`❌ getForecast FAILED - ${error.message}`);
  }

  // Test 3: getCitySuggestions
  try {
    const suggestions = await getCitySuggestions('Kar');
    const cityNames = suggestions.map(city => city.name).join(', ');
    console.log(`✅ getCitySuggestions PASSED - Cities: ${cityNames}`);
    passed++;
  } catch (error) {
    console.log(`❌ getCitySuggestions FAILED - ${error.message}`);
  }

  // Summary
  console.log(`=== API TEST RESULTS: ${passed}/${total} tests passed ===`);
};

export default runApiTests;
