import React, { useState, useEffect } from 'react';

interface Airport {
  icao: string;
  name: string;
  runways: Array<{ number: string; heading: number[] }>;
}

interface AirportSelectorProps {
  onSelect: (airports: Airport[]) => void;
}

const AirportSelector: React.FC<AirportSelectorProps> = ({ onSelect }) => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [selectedAirports, setSelectedAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/airports.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load airports.json');
        return res.json();
      })
      .then(data => {
        setAirports(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAirportSelect = (airport: Airport) => {
    if (selectedAirports.find(a => a.icao === airport.icao)) {
      setSelectedAirports(selectedAirports.filter(a => a.icao !== airport.icao));
    } else if (selectedAirports.length < 4) {
      setSelectedAirports([...selectedAirports, airport]);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-2xl w-full">
      <h2 className="text-xl font-bold mb-4">Select Airports (Max 4)</h2>
      {loading && <div className="text-gray-300">Loading airports...</div>}
      {error && <div className="text-red-400">{error}</div>}
      {!loading && airports.length === 0 && !error && (
        <div className="text-yellow-400">No airports found.</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {airports.map((airport) => (
          <div
            key={airport.icao}
            className={`p-4 rounded cursor-pointer transition-colors ${
              selectedAirports.find(a => a.icao === airport.icao)
                ? 'bg-blue-600'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => handleAirportSelect(airport)}
          >
            <div className="font-semibold">{airport.icao}</div>
            <div className="text-sm text-gray-300">{airport.name}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <button
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded disabled:opacity-50"
          onClick={() => onSelect(selectedAirports)}
          disabled={selectedAirports.length === 0}
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
};

export default AirportSelector; 