import React from 'react';

interface Runway {
  number: string;
  heading: number[]; // Always an array of two numbers
}

interface Props {
  runways: Runway[];
  windDirection: number | null;
  windSpeed: number | null;
  windGust?: number | null;
  qnh?: number | null;
  size?: number;
}

function degToRad(deg: number) {
  return ((deg - 90) * Math.PI) / 180;
}

const RunwayWindCompass: React.FC<Props> = ({ runways, windDirection, windSpeed, windGust, qnh, size = 340 }) => {
  const center = size / 2;
  const radius = center - 40;
  const scale = size / 340; // Scale factor relative to original size
  return (
    <svg width={size} height={size} className="bg-blue-600 rounded shadow-lg">
      {/* Compass background */}
      <circle cx={center} cy={center} r={radius + 24} fill="#3b5cb8" />
      {/* Compass circle */}
      <circle cx={center} cy={center} r={radius} fill="#223488" stroke="#fff" strokeWidth={2} />
      {/* Cardinal directions */}
      {['N', 'E', 'S', 'W'].map((label, i) => {
        const angle = degToRad(i * 90);
        const x = center + (radius - 36) * Math.cos(angle);
        const y = center + (radius - 36) * Math.sin(angle) + 12;
        return <text key={label} x={x} y={y} fill="#fff" fontSize={36 * scale} fontWeight="bold" textAnchor="middle">{label}</text>;
      })}
      {/* Runways */}
      {runways.map((r, i) => {
        if (!Array.isArray(r.heading) || r.heading.length !== 2 ||
            typeof r.heading[0] !== 'number' || typeof r.heading[1] !== 'number') {
          return null;
        }
        const [h1, h2] = r.heading;
        const angle1 = degToRad(h1);
        const angle2 = degToRad(h2);
        const x1 = center + (radius - 32) * Math.cos(angle1);
        const y1 = center + (radius - 32) * Math.sin(angle1);
        const x2 = center + (radius - 32) * Math.cos(angle2);
        const y2 = center + (radius - 32) * Math.sin(angle2);
        return (
          <g key={i} filter="url(#shadow)">
            <rect
              x={center - 10}
              y={center - radius + 32}
              width={20}
              height={radius * 2 - 64}
              fill="#111"
              rx={5}
              transform={`rotate(${h1 - 90} ${center} ${center})`}
              stroke="#fff"
              strokeWidth={2}
            />
            {/* Runway numbers at both ends */}
            <text x={x1} y={y1} fill="#fff" fontSize={22 * scale} fontWeight="bold" textAnchor="middle" dy={-10 * scale}>{r.number.split('/')[0]}</text>
            <text x={x2} y={y2} fill="#fff" fontSize={22 * scale} fontWeight="bold" textAnchor="middle" dy={-10 * scale}>{r.number.split('/')[1] || r.number.split('/')[0]}</text>
          </g>
        );
      })}
      {/* Wind barb */}
      {windDirection !== null && windSpeed !== null && (() => {
        const windAngle = windDirection;
        const barbLen = radius - 56;
        const wx = center + barbLen * Math.cos(degToRad(windAngle));
        const wy = center + barbLen * Math.sin(degToRad(windAngle));
        const triBase = 26, triHeight = 32;
        const tx = center + (barbLen - triHeight) * Math.cos(degToRad(windAngle));
        const ty = center + (barbLen - triHeight) * Math.sin(degToRad(windAngle));
        const perp = degToRad(windAngle + 90);
        const t1x = wx + (triBase / 2) * Math.cos(perp);
        const t1y = wy + (triBase / 2) * Math.sin(perp);
        const t2x = wx - (triBase / 2) * Math.cos(perp);
        const t2y = wy - (triBase / 2) * Math.sin(perp);
        return (
          <g>
            <line x1={center} y1={center} x2={wx} y2={wy} stroke="#fff" strokeWidth={8} />
            <polygon points={`${wx},${wy} ${t1x},${t1y} ${t2x},${t2y}`} fill="#fff" />
          </g>
        );
      })()}
      {/* QNH (left) */}
      {qnh !== undefined && qnh !== null && (
        <g>
          <text x={center - radius - 38 * scale} y={center - 10 * scale} fill="#fff" fontSize={34 * scale} fontWeight="bold" textAnchor="middle">{qnh}</text>
          <text x={center - radius - 38 * scale} y={center + 28 * scale} fill="#fff" fontSize={20 * scale} textAnchor="middle">hPa</text>
        </g>
      )}
      {/* Wind speed/gust (right) */}
      {windSpeed !== null && (
        <g>
          <text x={center + radius + 38 * scale} y={center - 10 * scale} fill="#fff" fontSize={34 * scale} fontWeight="bold" textAnchor="middle">
            {windSpeed}
            {windGust && windGust > windSpeed ? `G${windGust}` : ''}
          </text>
          <text x={center + radius + 38 * scale} y={center + 28 * scale} fill="#fff" fontSize={20 * scale} textAnchor="middle">knt</text>
        </g>
      )}
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>
    </svg>
  );
};

export default RunwayWindCompass; 