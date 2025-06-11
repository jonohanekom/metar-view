import React from 'react';

interface Runway {
  number: string;
  heading: number;
}

interface Props {
  runways: Runway[];
  windDirection: number | null;
  windSpeed: number | null;
}

const size = 220, center = size / 2, radius = center - 16;

function degToRad(deg: number) {
  return ((deg - 90) * Math.PI) / 180;
}

const cardinal = [
  { label: 'N', deg: 0 },
  { label: 'E', deg: 90 },
  { label: 'S', deg: 180 },
  { label: 'W', deg: 270 },
];

const RunwayWindCompass: React.FC<Props> = ({ runways, windDirection, windSpeed }) => (
  <svg width={size} height={size} className="bg-blue-600 rounded shadow-lg">
    {/* Compass background */}
    <circle cx={center} cy={center} r={radius + 8} fill="#3b5cb8" />
    {/* Compass circle */}
    <circle cx={center} cy={center} r={radius} fill="#223488" stroke="#fff" strokeWidth={2} />
    {/* Tick marks */}
    {[...Array(36)].map((_, i) => {
      const angle = degToRad(i * 10);
      const len = i % 3 === 0 ? 10 : 5;
      const x1 = center + (radius - len) * Math.cos(angle);
      const y1 = center + (radius - len) * Math.sin(angle);
      const x2 = center + radius * Math.cos(angle);
      const y2 = center + radius * Math.sin(angle);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" strokeWidth={i % 3 === 0 ? 2 : 1} opacity={0.7} />;
    })}
    {/* Cardinal directions */}
    {cardinal.map((c, i) => {
      const angle = degToRad(c.deg);
      const x = center + (radius - 22) * Math.cos(angle);
      const y = center + (radius - 22) * Math.sin(angle) + 5;
      return <text key={i} x={x} y={y} fill="#fff" fontSize={22} fontWeight="bold" textAnchor="middle">{c.label}</text>;
    })}
    {/* Runways */}
    {runways.map((r, i) => {
      const heading = typeof r.heading === 'string' ? parseInt(r.heading) : r.heading;
      return (
        <g key={i} filter="url(#shadow)">
          <rect x={center - 7} y={center - radius + 10} width={14} height={radius * 2 - 20} fill="#111" rx={4}
            transform={`rotate(${heading - 90} ${center} ${center})`} stroke="#fff" strokeWidth={1.5} />
          {/* Runway numbers */}
          <text x={center} y={center - radius + 28} fill="#fff" fontSize={13} fontWeight="bold" textAnchor="middle">{r.number.split('/')[0]}</text>
          <text x={center} y={center + radius - 18} fill="#fff" fontSize={13} fontWeight="bold" textAnchor="middle">{r.number.split('/')[1] || r.number.split('/')[0]}</text>
        </g>
      );
    })}
    {/* Wind arrow */}
    {windDirection !== null && (
      <g>
        <line x1={center} y1={center} x2={center + (radius - 36) * Math.cos(degToRad(windDirection))} y2={center + (radius - 36) * Math.sin(degToRad(windDirection))} stroke="#fff" strokeWidth={8} markerEnd="url(#arrow)" opacity={0.95} />
        <circle cx={center} cy={center} r={16} fill="#fff" opacity={0.13} />
        <circle cx={center} cy={center} r={7} fill="#fff" opacity={0.22} />
        <text x={center} y={center + radius - 8} fill="#fff" fontSize={15} textAnchor="middle" fontWeight="bold">{windSpeed !== null ? `${windSpeed} kt` : ''}</text>
      </g>
    )}
    <defs>
      <marker id="arrow" markerWidth="16" markerHeight="16" refX="12" refY="4" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,8 L14,4 z" fill="#fff" />
      </marker>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.4" />
      </filter>
    </defs>
  </svg>
);

export default RunwayWindCompass; 