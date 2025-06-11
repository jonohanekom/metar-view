import React, { useState, useEffect } from 'react';
import AirportSelector from './components/AirportSelector';

interface Airport {
  icao: string;
  name: string;
  runways: Array<{ number: string; heading: number | string }>;
}

function App() {
  const [selectedAirports, setSelectedAirports] = useState<Airport[]>([]);
  const [showSelector, setShowSelector] = useState(true);

  useEffect(() => {
    console.log('App mounted, showSelector:', showSelector);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      {showSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" style={{ display: 'flex' }}>
          <div className="bg-red-500 p-4">Debug: Dialog should be visible</div>
          <AirportSelector
            onSelect={(airports: Airport[]) => {
              console.log('Airports selected:', airports);
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
        ) : (
          selectedAirports.map((airport) => (
            <div key={airport.icao} className="bg-gray-800 rounded p-4 min-w-[250px]">
              <div className="font-semibold">{airport.icao} - {airport.name}</div>
              <div className="text-sm text-gray-400">Runways: {airport.runways.map(r => r.number).join(', ')}</div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default App; 