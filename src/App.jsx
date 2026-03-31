import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WeatherPage from './pages/WeatherPage';

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          position: 'relative',
          minHeight: '100vh',
          background: 'linear-gradient(145deg, #e8f0ff 0%, #ddeeff 45%, #eef5ff 100%)',
          overflow: 'hidden',
        }}
      >
        {/* SVG Cloud Background */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.55,
            pointerEvents: 'none',
          }}
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Cloud 1 - Top Left */}
          <g fill="#bfdbfe">
            <ellipse cx="200" cy="100" rx="120" ry="60" />
            <ellipse cx="160" cy="90" rx="80" ry="50" />
            <ellipse cx="240" cy="90" rx="80" ry="50" />
            <ellipse cx="200" cy="70" rx="60" ry="40" />
            <ellipse cx="200" cy="110" rx="100" ry="45" />
          </g>

          {/* Cloud 2 - Top Right */}
          <g fill="#c7d2fe">
            <ellipse cx="950" cy="80" rx="130" ry="65" />
            <ellipse cx="900" cy="70" rx="85" ry="52" />
            <ellipse cx="1000" cy="70" rx="85" ry="52" />
            <ellipse cx="950" cy="50" rx="65" ry="42" />
            <ellipse cx="950" cy="90" rx="110" ry="48" />
          </g>

          {/* Cloud 3 - Middle */}
          <g fill="#dbeafe" opacity="0.8">
            <ellipse cx="600" cy="380" rx="140" ry="75" />
            <ellipse cx="540" cy="360" rx="95" ry="58" />
            <ellipse cx="660" cy="360" rx="95" ry="58" />
            <ellipse cx="600" cy="330" rx="75" ry="48" />
          </g>

          {/* Cloud 4 - Bottom Left */}
          <g fill="#e0e7ff" opacity="0.7">
            <ellipse cx="120" cy="650" rx="110" ry="55" />
            <ellipse cx="70" cy="630" rx="75" ry="45" />
            <ellipse cx="170" cy="630" rx="75" ry="45" />
          </g>
        </svg>

        {/* Blur Orb 1 - Top Right */}
        <div
          style={{
            position: 'absolute',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: '#bfdbfe',
            top: '-80px',
            right: '-60px',
            opacity: 0.5,
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
        />

        {/* Blur Orb 2 - Bottom Left */}
        <div
          style={{
            position: 'absolute',
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            background: '#c7d2fe',
            bottom: '0',
            left: '-50px',
            opacity: 0.4,
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />

        {/* Routes Container */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather/:city" element={<WeatherPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
