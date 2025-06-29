import React from 'react';
import RunwayWindCompass from './RunwayWindCompass';
import { WiDaySunny, WiNightClear, WiStrongWind, WiCloud, WiBarometer, WiDayFog } from 'react-icons/wi';
import { FaEye } from 'react-icons/fa';

interface Runway {
  number: string;
  heading: number[];
}

interface MetarPanelProps {
  icao: string;
  name: string;
  runways: Runway[];
  vfrStatus: string;
  temp: number | null;
  weatherIcon?: React.ReactNode;
  windSpeed: number | null;
  windGust?: number | null;
  windDirection: number | null;
  windText: string;
  visibility: string;
  ceiling: string;
  qnh: number | null;
  time: string;
  metar: string;
  cardSize: number;
}

const MetarPanel: React.FC<MetarPanelProps> = ({
  icao, name, runways, vfrStatus, temp, weatherIcon, windSpeed, windGust, windDirection, windText, visibility, ceiling, qnh, time, metar, cardSize
}) => {
  // Responsive sizing based on number of cards
  const isCompact = cardSize === 3; // Only 3 cards in a row is truly compact
  const isVeryCompact = false; // Removed very compact mode since 4 cards now use 2x2 grid
  
  return (
  <div className={`bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 rounded-xl shadow-2xl ${
    isCompact ? 'p-3' : cardSize >= 2 ? 'p-4' : 'p-6'
  } flex flex-col w-full h-fit`}>
    {/* Header and status row */}
    <div className="flex flex-row justify-between items-start mb-2">
      <div>
        <div className={`${
          isCompact ? 'text-xl' : 'text-2xl'
        } font-extrabold tracking-tight text-white drop-shadow`}>METAR {icao} · {name}</div>
      </div>
      <div className="text-right text-sm text-blue-200 font-semibold flex flex-col items-end">
        <span>{time}</span>
      </div>
    </div>
    <div className={`${
      isCompact ? 'grid grid-cols-3 gap-1.5 mb-3' : cardSize >= 2 ? 'flex flex-row gap-2 mb-4' : 'flex flex-row gap-3 mb-6'
    }`}>
      <div className={`bg-green-500/90 rounded-lg ${
        isCompact ? 'px-2 py-1.5' : cardSize >= 2 ? 'px-3 py-2' : 'px-5 py-3'
      } text-white flex flex-col items-center shadow-md`}>
        <span className={`${isCompact ? 'text-sm' : cardSize >= 2 ? 'text-base' : 'text-xl'} font-bold`}>{vfrStatus}</span>
        {!isCompact && <span className="text-xs font-medium text-green-100">No warnings</span>}
      </div>
      <div className={`bg-blue-600/90 rounded-lg ${
        isCompact ? 'px-2 py-1.5' : cardSize >= 2 ? 'px-3 py-2' : 'px-5 py-3'
      } flex flex-col items-center shadow-md`}>
        <span className={`${isCompact ? 'text-sm' : cardSize >= 2 ? 'text-base' : 'text-xl'} font-bold text-white flex items-center gap-1`}>
          {!isCompact && (weatherIcon || <WiNightClear />)} {temp !== null ? `${temp}°C` : '--'}
        </span>
        {!isCompact && <span className="text-xs text-blue-100">Clear</span>}
      </div>
      <div className={`bg-cyan-700/90 rounded-lg ${
        isCompact ? 'px-2 py-1.5' : cardSize >= 2 ? 'px-3 py-2' : 'px-5 py-3'
      } flex flex-col items-center shadow-md`}>
        <span className={`${isCompact ? 'text-sm' : cardSize >= 2 ? 'text-base' : 'text-xl'} font-bold text-white flex items-center gap-1`}>
          {!isCompact && <WiStrongWind />}{windSpeed !== null ? `${windSpeed} kt` : '--'}
        </span>
        {!isCompact && <span className="text-xs text-cyan-100">{windText}</span>}
      </div>
      <div className={`bg-blue-700/90 rounded-lg ${
        isCompact ? 'px-2 py-1.5' : cardSize >= 2 ? 'px-3 py-2' : 'px-5 py-3'
      } flex flex-col items-center shadow-md`}>
        <span className={`${isCompact ? 'text-sm' : cardSize >= 2 ? 'text-base' : 'text-xl'} font-bold text-white flex items-center gap-1`}>
          {!isCompact && <FaEye />}{visibility}
        </span>
        {!isCompact && <span className="text-xs text-blue-100">Visibility</span>}
      </div>
      <div className={`bg-purple-700/90 rounded-lg ${
        isCompact ? 'px-2 py-1.5' : cardSize >= 2 ? 'px-3 py-2' : 'px-5 py-3'
      } flex flex-col items-center shadow-md`}>
        <span className={`${isCompact ? 'text-sm' : cardSize >= 2 ? 'text-base' : 'text-xl'} font-bold text-white flex items-center gap-1`}>
          {!isCompact && <WiCloud />}{ceiling}
        </span>
        {!isCompact && <span className="text-xs text-purple-100">Ceiling</span>}
      </div>
      <div className={`bg-blue-900/90 rounded-lg ${
        isCompact ? 'px-2 py-1.5' : cardSize >= 2 ? 'px-3 py-2' : 'px-5 py-3'
      } flex flex-col items-center shadow-md`}>
        <span className={`${isCompact ? 'text-sm' : cardSize >= 2 ? 'text-base' : 'text-xl'} font-bold text-white flex items-center gap-1`}>
          {!isCompact && <WiBarometer />}{qnh !== null ? `${qnh} hPa` : '--'}
        </span>
        {!isCompact && <span className="text-xs text-blue-100">QNH</span>}
      </div>
    </div>
    {/* Main visualization row */}
    <div className={`flex flex-row ${cardSize >= 2 ? 'gap-2' : 'gap-4'} items-center justify-between ${cardSize >= 2 ? 'mb-3' : 'mb-4'}`}>
      <div className="flex-[2] flex justify-center">
        <RunwayWindCompass
          runways={runways}
          windDirection={windDirection}
          windSpeed={windSpeed}
          windGust={windGust}
          qnh={qnh}
          size={isCompact ? 200 : 240}
        />
      </div>
      <div className="flex-1 flex justify-center">
        {/* Placeholder for CeilingVisibilityBar */}
        <div className={`bg-gradient-to-br from-purple-700 to-blue-900 rounded-xl ${
          isCompact ? 'w-24 h-32 text-sm' : 'w-32 h-40 text-base'
        } flex items-center justify-center text-white font-bold shadow-lg`}>Ceiling/Vis</div>
      </div>
    </div>
    {/* Raw METAR string */}
    <div className={`${cardSize >= 2 ? 'mt-1' : 'mt-2'} flex justify-center`}>
      <div className={`bg-gray-900/90 rounded-full ${
        isCompact ? 'px-2 py-1 text-xs' : cardSize >= 2 ? 'px-4 py-1.5 text-xs' : 'px-8 py-3 text-sm'
      } font-mono text-blue-100 shadow-lg tracking-wide truncate max-w-full`}>{metar}</div>
    </div>
  </div>
);
};

export default MetarPanel; 