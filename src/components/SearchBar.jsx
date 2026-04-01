import { useState, useEffect, useRef } from 'react';
import { getCitySuggestions } from '../services/weatherApi';

const dropHintStyle = {
  padding: '12px 18px',
  color: '#64748b',
  fontSize: '14px',
  lineHeight: 1.45,
  fontFamily: "'Outfit', sans-serif",
};

const SearchBar = ({ onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDrop, setShowDrop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        setFetchError(null);
        setShowDrop(false);
        setLoading(false);
        return;
      }

      const trimmed = query.trim();
      setLoading(true);
      setFetchError(null);
      try {
        const results = await getCitySuggestions(trimmed);
        setSuggestions(Array.isArray(results) ? results : []);
        setShowDrop(true);
      } catch (error) {
        setSuggestions([]);
        setFetchError(error.message || 'Could not load suggestions.');
        setShowDrop(true);
      } finally {
        setLoading(false);
      }
    }, 300);

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

  const handleSuggestionClick = (city) => {
    onCitySelect(city.weatherQuery);
    setQuery('');
    setSuggestions([]);
    setFetchError(null);
    setShowDrop(false);
  };

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    if (query.trim().length < 2) return;
    if (suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
      return;
    }
    setFetchError(
      'No city matched. Type a few letters and pick a suggestion, or check spelling (try English names).',
    );
    setShowDrop(true);
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
        onKeyDown={handleKeyDown}
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
          if (query.trim().length >= 2 && (suggestions.length > 0 || fetchError)) {
            setShowDrop(true);
          }
        }}
        onBlur={(e) => {
          e.target.style.background = 'rgba(255,255,255,0.7)';
          e.target.style.borderColor = 'rgba(99,102,241,0.15)';
        }}
      />

      {/* Dropdown: full city names from Geo API (e.g. partial "los ang" → "Los Angeles, California, US") */}
      {showDrop && query.trim().length >= 2 && (
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
          {loading && <div style={dropHintStyle}>Searching cities…</div>}
          {!loading && fetchError && <div style={dropHintStyle}>{fetchError}</div>}
          {!loading &&
            !fetchError &&
            suggestions.length === 0 && (
              <div style={dropHintStyle}>
                No matching cities. Try a different spelling, use English names, or add the country (e.g.
                Paris, FR).
              </div>
            )}
          {!loading &&
            !fetchError &&
            suggestions.length > 0 &&
            suggestions.map((city) => (
              <div
                key={`${city.lat}-${city.lon}-${city.country}-${city.name}`}
                onClick={() => handleSuggestionClick(city)}
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
                <span style={{ color: '#1e3a8a', fontWeight: 500, fontSize: '15px' }}>{city.label}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
