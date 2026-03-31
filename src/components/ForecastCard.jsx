const ForecastCard = ({ forecastList }) => {
  return (
    <>
      <style>{`
        .forecast-scroll::-webkit-scrollbar {
          display: none;
        }
        .forecast-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div
        style={{
          background: 'rgba(255,255,255,0.72)',
          border: '1.5px solid rgba(99,102,241,0.13)',
          borderRadius: '28px',
          padding: '24px',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 4px 24px rgba(99,102,241,0.08)',
        }}
      >
        {/* Section Label */}
        <div
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            color: '#94a3b8',
            marginBottom: '16px',
          }}
        >
          5-Day Forecast
        </div>

        {/* Forecast Row */}
        <div
          className="forecast-scroll"
          style={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
          }}
        >
          {forecastList.map((item, index) => {
            const dayName =
              index === 0
                ? 'Today'
                : new Date(item.dt_txt).toLocaleDateString('en', {
                    weekday: 'short',
                  });
            const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

            const isFirst = index === 0;

            return (
              <div
                key={index}
                style={{
                  flexShrink: 0,
                  minWidth: '90px',
                  background: isFirst
                    ? 'rgba(59,130,246,0.12)'
                    : 'rgba(241,245,255,0.85)',
                  border: isFirst
                    ? '1px solid rgba(59,130,246,0.3)'
                    : '1px solid rgba(99,102,241,0.1)',
                  borderRadius: '18px',
                  padding: '14px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isFirst) {
                    e.currentTarget.style.background = 'rgba(255,255,255,1)';
                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isFirst) {
                    e.currentTarget.style.background = 'rgba(241,245,255,0.85)';
                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.1)';
                  }
                }}
              >
                {/* Day */}
                <div
                  style={{
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    color: isFirst ? '#3b82f6' : '#94a3b8',
                    marginBottom: '8px',
                  }}
                >
                  {dayName}
                </div>

                {/* Icon */}
                <img
                  src={iconUrl}
                  alt={item.weather[0].description}
                  style={{
                    width: '48px',
                    height: '48px',
                    display: 'block',
                    margin: '0 auto',
                  }}
                />

                {/* High Temp */}
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#1e3a8a',
                  }}
                >
                  {Math.round(item.main.temp_max)}°
                </div>

                {/* Low Temp */}
                <div
                  style={{
                    fontSize: '11px',
                    color: '#94a3b8',
                  }}
                >
                  {Math.round(item.main.temp_min)}°
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ForecastCard;
