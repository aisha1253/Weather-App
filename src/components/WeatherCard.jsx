import WeatherIcon from './WeatherIcon';

const WeatherCard = ({ data }) => {
  const description = data.weather[0].description;
  const capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>

      <div
        style={{
          background: 'rgba(255,255,255,0.72)',
          border: '1.5px solid rgba(99,102,241,0.13)',
          borderRadius: '28px',
          padding: '28px',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 4px 24px rgba(99,102,241,0.08)',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {/* Top shimmer line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.25), transparent)',
          }}
        />

        {/* City name + Live badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '26px',
              fontWeight: 700,
              color: '#1e3a8a',
            }}
          >
            {data.name}
          </h2>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(16,185,129,0.12)',
              color: '#059669',
              fontSize: '11px',
              borderRadius: '20px',
              padding: '3px 10px',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#059669',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
            Live
          </span>
        </div>

        {/* Country */}
        <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '8px' }}>
          {data.sys.country}
        </div>

        {/* Weather Icon */}
        <WeatherIcon iconCode={data.weather[0].icon} size={100} />

        {/* Temperature */}
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px' }}>
          <span
            style={{
              fontSize: '80px',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              letterSpacing: '-3px',
              background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
            }}
          >
            {Math.round(data.main.temp)}
          </span>
          <span
            style={{
              fontSize: '26px',
              color: '#64748b',
              marginTop: '12px',
              marginLeft: '4px',
            }}
          >
            °C
          </span>
        </div>

        {/* Description */}
        <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '18px' }}>
          {capitalizedDescription} — feels like {Math.round(data.main.feels_like)}°C
        </p>

        {/* Stats Row */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {/* Humidity */}
          <div
            style={{
              flex: 1,
              background: 'rgba(241,245,255,0.85)',
              border: '1.5px solid rgba(99,102,241,0.1)',
              borderRadius: '14px',
              padding: '14px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '10px',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                color: '#94a3b8',
                marginBottom: '4px',
              }}
            >
              Humidity
            </div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#1e3a8a' }}>
              {data.main.humidity}%
            </div>
          </div>

          {/* Wind */}
          <div
            style={{
              flex: 1,
              background: 'rgba(241,245,255,0.85)',
              border: '1.5px solid rgba(99,102,241,0.1)',
              borderRadius: '14px',
              padding: '14px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '10px',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                color: '#94a3b8',
                marginBottom: '4px',
              }}
            >
              Wind
            </div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#1e3a8a' }}>
              {data.wind.speed} m/s
            </div>
          </div>

          {/* Feels Like */}
          <div
            style={{
              flex: 1,
              background: 'rgba(241,245,255,0.85)',
              border: '1.5px solid rgba(99,102,241,0.1)',
              borderRadius: '14px',
              padding: '14px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '10px',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                color: '#94a3b8',
                marginBottom: '4px',
              }}
            >
              Feels Like
            </div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#1e3a8a' }}>
              {Math.round(data.main.feels_like)}°C
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
