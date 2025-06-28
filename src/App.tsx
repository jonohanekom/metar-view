import React, { useState, useEffect } from 'react';
import AirportSelector from './components/AirportSelector';
import { fetchMetars, MetarResult } from './utils/fetchMetar';
import { parseMetar, ParsedMetar } from './utils/parseMetar';
import MetarPanel from './components/MetarPanel';

interface Airport {
  icao: string;
  name: string;
  runways: Array<{ number: string; heading: number[] }>;
}

function App() {
  const [selectedAirports, setSelectedAirports] = useState<Airport[]>([]);
  const [showSelector, setShowSelector] = useState(true);
  const [metars, setMetars] = useState<MetarResult[]>([]);
  const [parsedMetars, setParsedMetars] = useState<ParsedMetar[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedAirports.length > 0) {
      setLoading(true);
      setError(null);
      fetchMetars(selectedAirports.map(a => a.icao))
        .then(data => {
          setMetars(data);
          const parsed = data.map(m => parseMetar(m.metar));
          setParsedMetars(parsed);
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      setMetars([]);
      setParsedMetars([]);
    }
  }, [selectedAirports]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      {showSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" style={{ display: 'flex' }}>
          <div className="bg-red-500 p-4">Debug: Dialog should be visible</div>
          <AirportSelector
            onSelect={(airports: Airport[]) => {
              setSelectedAirports(airports);
              setShowSelector(false);
            }}
          />
        </div>
      )}
      <header className="w-full p-4 text-center text-2xl font-bold">METAR Viewer</header>
      <main className="flex flex-wrap gap-8 justify-center mt-8">
        {selectedAirports.length === 0 ? (
          <div className="text-gray-400">No airports selected.</div>
        ) : loading ? (
          <div className="text-gray-400">Loading METAR data...</div>
        ) : error ? (
          <div className="text-red-400">Error: {error}</div>
        ) : (
          <>
            {selectedAirports.map((airport) => {
              const parsed = parsedMetars.find(m => m.icao === airport.icao);
              const metarRaw = metars.find(m => m.icao === airport.icao)?.metar || '';
              // Placeholder logic for VFR/IFR, weather icon, wind text, visibility, ceiling, time
              return parsed ? (
                <MetarPanel
                  key={airport.icao}
                  icao={airport.icao}
                  name={airport.name}
                  runways={airport.runways}
                  vfrStatus={"VFR"}
                  temp={parsed.temperature}
                  weatherIcon={<span>🌙</span>}
                  windSpeed={parsed.wind.speed}
                  windGust={parsed.wind.gust}
                  windDirection={parsed.wind.direction}
                  windText={parsed.wind.direction !== null ? `${parsed.wind.direction}°` : '--'}
                  visibility={"10 km+"}
                  ceiling={parsed.clouds || 'None'}
                  qnh={parsed.qnh}
                  time={parsed.time}
                  metar={metarRaw}
                />
              ) : null;
            })}
          </>
        )}
      </main>
    </div>
  );
}

export default App; 