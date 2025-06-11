import React, { useState, useEffect } from 'react';
import AirportSelector from './components/AirportSelector';
import { fetchMetars, MetarResult } from './utils/fetchMetar';
import { parseMetar, ParsedMetar } from './utils/parseMetar';

interface Airport {
  icao: string;
  name: string;
  runways: Array<{ number: string; heading: number | string }>;
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
      <main className="flex flex-wrap gap-4 justify-center mt-8">
        {selectedAirports.length === 0 ? (
          <div className="text-gray-400">No airports selected.</div>
        ) : loading ? (
          <div className="text-gray-400">Loading METAR data...</div>
        ) : error ? (
          <div className="text-red-400">Error: {error}</div>
        ) : (
          <>
            {/* Print all raw METARs for debugging */}
            <div className="w-full mb-4">
              <div className="text-xs text-gray-400 font-mono">Raw METARs:</div>
              {metars.map((m) => (
                <div key={m.icao} className="text-xs bg-gray-900 rounded p-1 font-mono mb-1">{m.metar}</div>
              ))}
            </div>
            {selectedAirports.map((airport) => {
              const parsed = parsedMetars.find(m => m.icao === airport.icao);
              return (
                <div key={airport.icao} className="bg-gray-800 rounded p-4 min-w-[300px] max-w-xs flex flex-col gap-2 shadow-lg">
                  <div className="font-semibold text-lg">{airport.icao} - {airport.name}</div>
                  <div className="text-sm text-gray-400">Runways: {airport.runways.map(r => r.number).join(', ')}</div>
                  {parsed ? (
                    <>
                      <div className="flex flex-col gap-1 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="font-bold">Wind:</span>
                          <span>{parsed.wind.direction !== null ? `${parsed.wind.direction}°` : '—'} @ {parsed.wind.speed !== null ? `${parsed.wind.speed}kt` : '—'}{parsed.wind.gust ? ` (G${parsed.wind.gust})` : ''}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-bold">Temp:</span>
                          <span>{parsed.temperature !== null ? `${parsed.temperature}°C` : '—'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-bold">QNH:</span>
                          <span>{parsed.qnh !== null ? `${parsed.qnh} hPa` : '—'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-bold">Clouds:</span>
                          <span>{parsed.clouds || '—'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-bold">Time:</span>
                          <span>{parsed.time ? new Date(parsed.time).toLocaleString() : '—'}</span>
                        </div>
                      </div>
                      <div className="mt-2 text-xs bg-gray-900 rounded p-2 font-mono">{parsed.raw}</div>
                    </>
                  ) : (
                    <div className="text-xs text-gray-400">No parsed METAR data.</div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </main>
    </div>
  );
}

export default App; 