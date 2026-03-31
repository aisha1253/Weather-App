import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const navigate = useNavigate();

  const handleCitySelect = (cityName) => {
    navigate(`/weather/${cityName.toLowerCase().replace(' ', '-')}`);
  };

  const popularCities = ['London', 'Tokyo', 'New York', 'Dubai', 'Karachi', 'Paris', 'Lahore'];

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
      {/* App Name */}
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '20px',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#1e3a8a',
          marginBottom: '60px',
        }}
      >
        WeatherNow
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#3b82f6',
          }}
        />
      </div>

      {/* Heading */}
      <h1
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '48px',
          fontWeight: 700,
          letterSpacing: '-1.5px',
          textAlign: 'center',
          margin: 0,
          background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        WeatherNow
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: '15px',
          color: '#64748b',
          marginBottom: '32px',
          marginTop: '8px',
        }}
      >
        Real-time weather for any city in the world
      </p>

      {/* SearchBar */}
      <div style={{ width: '100%', maxWidth: '480px', marginBottom: '40px' }}>
        <SearchBar onCitySelect={handleCitySelect} />
      </div>

      {/* Popular Cities Label */}
      <div
        style={{
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          color: '#94a3b8',
          marginBottom: '14px',
        }}
      >
        Popular Cities
      </div>

      {/* City Chips */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center',
        }}
      >
        {popularCities.map((city) => (
          <button
            key={city}
            onClick={() => handleCitySelect(city)}
            style={{
              background: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(99,102,241,0.15)',
              borderRadius: '30px',
              padding: '8px 18px',
              color: '#475569',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif",
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.85)';
              e.currentTarget.style.borderColor = 'rgba(99,102,241,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.6)';
              e.currentTarget.style.borderColor = 'rgba(99,102,241,0.15)';
            }}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
