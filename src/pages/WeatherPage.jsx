import { useParams, useNavigate } from 'react-router-dom';
import { useWeather } from '../hooks/useWeather';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';

const WeatherPage = () => {
  const { city } = useParams();
  const navigate = useNavigate();
  const { weatherData, forecastData, loading, error } = useWeather(city);

  const handleCitySelect = (newCity) => {
    navigate(`/weather/${newCity.toLowerCase().replace(' ', '-')}`);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌫️</div>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '24px',
              fontWeight: 600,
              color: '#1e3a8a',
              marginBottom: '8px',
            }}
          >
            City not found
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
            {error}
          </p>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: '30px',
              padding: '10px 24px',
              color: '#475569',
              cursor: 'pointer',
              fontSize: '14px',
              fontFamily: "'Outfit', sans-serif",
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.7)';
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '20px',
        maxWidth: '640px',
        margin: '0 auto',
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(99,102,241,0.15)',
            borderRadius: '30px',
            padding: '8px 18px',
            color: '#475569',
            cursor: 'pointer',
            fontSize: '13px',
            fontFamily: "'Outfit', sans-serif",
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.85)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.6)';
          }}
        >
          ← Back
        </button>
        <div style={{ flex: 1 }}>
          <SearchBar onCitySelect={handleCitySelect} />
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <WeatherCard data={weatherData} />
        <ForecastCard forecastList={forecastData} />
      </div>
    </div>
  );
};

export default WeatherPage;
