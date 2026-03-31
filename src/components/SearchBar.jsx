import { useState, useEffect, useRef } from 'react';
import { getCitySuggestions } from '../services/weatherApi';

const SearchBar = ({ onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDrop, setShowDrop] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length >= 2) {
        try {
          const results = await getCitySuggestions(query);
          setSuggestions(results);
          setShowDrop(true);
        } catch (error) {
          setSuggestions([]);
          setShowDrop(false);
        }
      } else {
        setSuggestions([]);
        setShowDrop(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDrop(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (name) => {
    onCitySelect(name);
    setQuery('');
    setSuggestions([]);
    setShowDrop(false);
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }} className="w-full">
      {/* Search Icon */}
      <span
        style={{
          position: 'absolute',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'rgba(30,58,138,0.4)',
          fontSize: '16px',
          pointerEvents: 'none',
        }}
      >
        🔍
      </span>

      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search city..."
        style={{
          width: '100%',
          background: 'rgba(255,255,255,0.7)',
          border: '1.5px solid rgba(99,102,241,0.15)',
          borderRadius: '16px',
          padding: '14px 18px 14px 48px',
          color: '#1e3a8a',
          fontSize: '15px',
          fontFamily: "'Outfit', sans-serif",
          backdropFilter: 'blur(12px)',
          outline: 'none',
          transition: 'all 0.2s ease',
        }}
        onFocus={(e) => {
          e.target.style.background = 'rgba(255,255,255,0.9)';
          e.target.style.borderColor = 'rgba(99,102,241,0.3)';
        }}
        onBlur={(e) => {
          e.target.style.background = 'rgba(255,255,255,0.7)';
          e.target.style.borderColor = 'rgba(99,102,241,0.15)';
        }}
      />

      {/* Dropdown */}
      {showDrop && suggestions.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            background: 'rgba(255,255,255,0.97)',
            border: '1px solid rgba(99,102,241,0.15)',
            borderRadius: '16px',
            backdropFilter: 'blur(20px)',
            zIndex: 50,
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(99,102,241,0.15)',
          }}
        >
          {suggestions.map((city, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(city.name)}
              style={{
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                borderBottom: '1px solid rgba(99,102,241,0.08)',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(99,102,241,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <span style={{ color: '#1e3a8a', fontWeight: 500 }}>{city.name}</span>
              <span style={{ color: '#94a3b8', fontSize: '13px' }}>
                , {city.country}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
