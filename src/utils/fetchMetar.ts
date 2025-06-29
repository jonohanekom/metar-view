export interface MetarResult {
  icao: string;
  metar: string;
}

export async function fetchMetars(icaos: string[]): Promise<MetarResult[]> {
  if (icaos.length === 0) return [];
  const url = `https://metar.vatsim.net/metar.php?id=${icaos.join(',')}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch METAR data');
  const text = await response.text();
  console.log('Raw METAR API response:', text); // Debug log
  // The API returns plain text, one METAR per line
  const results = text
    .trim()
    .split('\n')
    .map(line => {
      const icao = line.split(' ')[0];
      return { icao, metar: line };
    });
  console.log('Parsed METAR results:', results); // Debug log
  return results;
} 