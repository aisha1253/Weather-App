const iconMap = {
  // Clear sky
  '01d': { icon: 'fa-sun', color: '#FFD700', bg: 'linear-gradient(135deg, #FFF9E6, #FFE4B5)' },
  '01n': { icon: 'fa-moon', color: '#C8D8FF', bg: 'linear-gradient(135deg, #E8E8FF, #D0D0F0)' },
  // Few clouds
  '02d': { icon: 'fa-cloud-sun', color: '#FFA500', bg: 'linear-gradient(135deg, #FFF9E6, #E8F0F8)' },
  '02n': { icon: 'fa-cloud-moon', color: '#A8B8D8', bg: 'linear-gradient(135deg, #E0E8F0, #D0D8E8)' },
  // Scattered clouds
  '03d': { icon: 'fa-cloud', color: '#B0C0D0', bg: 'linear-gradient(135deg, #F0F4F8, #E0E8F0)' },
  '03n': { icon: 'fa-cloud', color: '#98A8B8', bg: 'linear-gradient(135deg, #E0E8F0, #D0D8E0)' },
  // Broken/overcast clouds
  '04d': { icon: 'fa-cloud', color: '#8898A8', bg: 'linear-gradient(135deg, #E8EEF5, #D0D8E0)' },
  '04n': { icon: 'fa-cloud', color: '#788898', bg: 'linear-gradient(135deg, #D8E0E8, #C8D0D8)' },
  // Shower rain
  '09d': { icon: 'fa-cloud-showers-heavy', color: '#5A8FC0', bg: 'linear-gradient(135deg, #E0E8F0, #D0E0F0)' },
  '09n': { icon: 'fa-cloud-showers-heavy', color: '#4A7FB0', bg: 'linear-gradient(135deg, #D0D8E0, #C0D0E0)' },
  // Rain
  '10d': { icon: 'fa-cloud-rain', color: '#4A9EDB', bg: 'linear-gradient(135deg, #E8F0F8, #D8E8F8)' },
  '10n': { icon: 'fa-cloud-rain', color: '#3A8ECB', bg: 'linear-gradient(135deg, #D8E0E8, #C8D8E8)' },
  // Thunderstorm
  '11d': { icon: 'fa-bolt', color: '#FFD700', bg: 'linear-gradient(135deg, #5A6A7A, #4A5568)' },
  '11n': { icon: 'fa-bolt', color: '#FFD700', bg: 'linear-gradient(135deg, #4A5A6A, #3A4558)' },
  // Snow
  '13d': { icon: 'fa-snowflake', color: '#A8D8F0', bg: 'linear-gradient(135deg, #F0F8FF, #E0F0F8)' },
  '13n': { icon: 'fa-snowflake', color: '#98C8E0', bg: 'linear-gradient(135deg, #E0F0F8, #D0E8F0)' },
  // Mist/Fog
  '50d': { icon: 'fa-smog', color: '#98A8B8', bg: 'linear-gradient(135deg, #E8EEF5, #D8E0E8)' },
  '50n': { icon: 'fa-smog', color: '#8898A8', bg: 'linear-gradient(135deg, #D8E0E8, #C8D0D8)' },
};

const WeatherIcon = ({ iconCode, size = 80 }) => {
  const config = iconMap[iconCode] || { icon: 'fa-circle-question', color: '#94a3b8', bg: 'linear-gradient(135deg, #E8E8E8, #D0D0D0)' };
  
  const isNight = iconCode?.endsWith('n');
  const isThunder = iconCode?.startsWith('11');
  
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: config.bg,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: isThunder 
          ? `0 4px 20px rgba(255,215,0,0.3), inset 0 2px 10px rgba(255,255,255,0.2)`
          : `0 4px 20px rgba(0,0,0,0.1), inset 0 2px 10px rgba(255,255,255,0.3)`,
      }}
    >
      <i 
        className={`fa-solid ${config.icon}`}
        style={{
          fontSize: `${size * 0.5}px`,
          color: config.color,
          filter: isThunder ? 'drop-shadow(0 0 8px rgba(255,215,0,0.8))' : 'none',
        }}
      />
    </div>
  );
};

export default WeatherIcon;
