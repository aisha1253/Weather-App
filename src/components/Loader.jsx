const Loader = () => {
  return (
    <>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        {/* Animated Ring */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            border: '3px solid rgba(59,130,246,0.15)',
            borderTop: '3px solid #3b82f6',
            animation: 'spin 0.8s linear infinite',
          }}
        />

        {/* App Name */}
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '16px',
            fontWeight: 600,
            color: '#64748b',
          }}
        >
          WeatherNow
        </div>

        {/* Loading Text */}
        <div
          style={{
            fontSize: '13px',
            color: '#94a3b8',
          }}
        >
          Fetching weather...
        </div>
      </div>
    </>
  );
};

export default Loader;
