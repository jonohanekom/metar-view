import { parseMetar as parseMetarLib } from 'metar-taf-parser';

export interface ParsedMetar {
  icao: string;
  wind: {
    direction: number | null;
    speed: number | null;
    gust: number | null;
  };
  temperature: number | null;
  dewpoint: number | null;
  qnh: number | null;
  clouds: string;
  time: string; // formatted string
  raw: string;
}

export function parseMetar(raw: string): ParsedMetar {
  const metar = parseMetarLib(raw);
  // Construct time string from day, hour, minute
  let time = '';
  if (metar.day && metar.hour !== undefined && metar.minute !== undefined) {
    time = `Day ${metar.day} ${String(metar.hour).padStart(2, '0')}:${String(metar.minute).padStart(2, '0')}Z`;
  }
  return {
    icao: metar.station || '',
    wind: {
      direction: metar.wind?.degrees ?? null,
      speed: metar.wind?.speed ?? null,
      gust: metar.wind?.gust ?? null,
    },
    temperature: metar.temperature ?? null,
    dewpoint: metar.dewPoint ?? null,
    qnh: metar.altimeter?.value ?? null,
    clouds: metar.clouds?.map((c: any) => c.repr).join(' ') || (metar.cavok ? 'CAVOK' : ''),
    time,
    raw,
  };
} 