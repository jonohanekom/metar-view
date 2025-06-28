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
}

const MetarPanel: React.FC<MetarPanelProps> = ({
  icao, name, runways, vfrStatus, temp, weatherIcon, windSpeed, windGust, windDirection, windText, visibility, ceiling, qnh, time, metar
}) => (
  <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 rounded-2xl shadow-2xl p-6 flex flex-col w-full max-w-3xl mx-auto">
    {/* Header and status row */}
    <div className="flex flex-row justify-between items-start mb-2">
      <div>
        <div className="text-2xl font-extrabold tracking-tight text-white drop-shadow">METAR {icao} · {name}</div>
      </div>
      <div className="text-right text-sm text-blue-200 font-semibold flex flex-col items-end">
        <span>{time}</span>
      </div>
    </div>
    <div className="flex flex-row gap-3 mb-6">
      <div className="bg-green-500/90 rounded-xl px-5 py-3 text-xl font-extrabold text-white flex flex-col items-center min-w-[100px] shadow-md">
        {vfrStatus}
        <span className="text-xs font-medium text-green-100">No warnings</span>
      </div>
      <div className="bg-blue-600/90 rounded-xl px-5 py-3 flex flex-col items-center min-w-[100px] shadow-md">
        <span className="text-2xl font-extrabold flex items-center gap-1">{weatherIcon || <WiNightClear />} {temp !== null ? `${temp}°C` : '--'}</span>
        <span className="text-xs text-blue-100 flex items-center gap-1"><WiDaySunny className="inline-block" />Clear</span>
      </div>
      <div className="bg-cyan-700/90 rounded-xl px-5 py-3 flex flex-col items-center min-w-[100px] shadow-md">
        <span className="text-2xl font-extrabold flex items-center gap-1"><WiStrongWind />{windSpeed !== null ? `${windSpeed} kt` : '--'}</span>
        <span className="text-xs text-cyan-100">{windText}</span>
      </div>
      <div className="bg-blue-700/90 rounded-xl px-5 py-3 flex flex-col items-center min-w-[100px] shadow-md">
        <span className="text-2xl font-extrabold flex items-center gap-1"><FaEye />{visibility}</span>
        <span className="text-xs text-blue-100">Visibility</span>
      </div>
      <div className="bg-purple-700/90 rounded-xl px-5 py-3 flex flex-col items-center min-w-[100px] shadow-md">
        <span className="text-2xl font-extrabold flex items-center gap-1"><WiCloud />{ceiling}</span>
        <span className="text-xs text-purple-100">Ceiling</span>
      </div>
      <div className="bg-blue-900/90 rounded-xl px-5 py-3 flex flex-col items-center min-w-[100px] shadow-md">
        <span className="text-2xl font-extrabold flex items-center gap-1"><WiBarometer />{qnh !== null ? `${qnh} hPa` : '--'}</span>
        <span className="text-xs text-blue-100">QNH</span>
      </div>
    </div>
    {/* Main visualization row */}
    <div className="flex flex-row gap-6 items-center justify-between mb-6">
      <div className="flex-1 flex justify-center">
        <RunwayWindCompass
          runways={runways}
          windDirection={windDirection}
          windSpeed={windSpeed}
          windGust={windGust}
          qnh={qnh}
        />
      </div>
      <div className="flex-1 flex justify-center">
        {/* Placeholder for WindGauge */}
        <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-full w-44 h-44 flex items-center justify-center text-3xl text-white font-bold shadow-lg">Wind Gauge</div>
      </div>
      <div className="flex-1 flex justify-center">
        {/* Placeholder for CeilingVisibilityBar */}
        <div className="bg-gradient-to-br from-purple-700 to-blue-900 rounded-2xl w-28 h-44 flex items-center justify-center text-lg text-white font-bold shadow-lg">Ceiling/Vis</div>
      </div>
    </div>
    {/* Raw METAR string */}
    <div className="mt-2 flex justify-center">
      <div className="bg-gray-900/90 rounded-full px-8 py-3 text-sm font-mono text-blue-100 shadow-lg tracking-wide">{metar}</div>
    </div>
  </div>
);

export default MetarPanel; 