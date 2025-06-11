import React, { useState, useEffect } from 'react';

interface Runway {
  number: string;
  heading: number;
}

interface Airport {
  icao: string;
  name: string;
  runways: Runway[];
}

interface AirportSelectorProps {
  maxSelection?: number;
  onSelect: (selected: Airport[]) => void;
}

const AirportSelector: React.FC<AirportSelectorProps> = ({ maxSelection = 4, onSelect }) => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Airport[]>([]);

  useEffect(() => {
    fetch('src/data/airports.json')
      .then(res => res.json())
      .then(setAirports)
      .catch(() => setAirports([]));
  }, []);

  const filtered = airports.filter(a =>
    a.icao.toLowerCase().includes(search.toLowerCase()) ||
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (airport: Airport) => {
    if (selected.find(a => a.icao === airport.icao)) {
      setSelected(selected.filter(a => a.icao !== airport.icao));
    } else if (selected.length < maxSelection) {
      setSelected([...selected, airport]);
    }
  };

  useEffect(() => {
    onSelect(selected);
  }, [selected, onSelect]);

  return (
    <div className="p-4 bg-gray-800 rounded-lg w-full max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-2 text-white">Select up to {maxSelection} Airports</h2>
      <input
        className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
        placeholder="Search airport by ICAO or name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul className="max-h-64 overflow-y-auto divide-y divide-gray-700">
        {filtered.map(airport => (
          <li
            key={airport.icao}
            className={`flex items-center justify-between p-2 cursor-pointer hover:bg-gray-700 rounded ${selected.find(a => a.icao === airport.icao) ? 'bg-blue-600 text-white' : 'text-gray-200'}`}
            onClick={() => toggleSelect(airport)}
          >
            <span>{airport.icao} - {airport.name}</span>
            {selected.find(a => a.icao === airport.icao) && <span className="ml-2">✓</span>}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={selected.length === 0}
          onClick={() => onSelect(selected)}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default AirportSelector; 