export interface OverpassNode {
  id: number
  lat: number
  lon: number
  tags: Record<string, string>
}

const ENDPOINT = 'https://overpass-api.de/api/interpreter'

async function query(ql: string): Promise<OverpassNode[]> {
  const body = `[out:json][timeout:25];\n${ql}\nout body;`
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    body: `data=${encodeURIComponent(body)}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  if (!res.ok) throw new Error(`Overpass error: ${res.status}`)
  const json = await res.json()
  return (json.elements as OverpassNode[]).slice(0, 300)
}

const CENTER_LAT = 41.8885
const CENTER_LON = -87.6354
const RADIUS = 3000 // meters

export async function fetchCafes(): Promise<OverpassNode[]> {
  return query(`node["name"="Starbucks"](around:${RADIUS},${CENTER_LAT},${CENTER_LON});`)
}

export async function fetchGolfCourses(): Promise<OverpassNode[]> {
  return query(`(node["leisure"="golf_course"](around:${RADIUS},${CENTER_LAT},${CENTER_LON});way["leisure"="golf_course"](around:${RADIUS},${CENTER_LAT},${CENTER_LON}););`)
    .catch(() => query(`node["leisure"="golf_course"](around:8000,${CENTER_LAT},${CENTER_LON});`))
}

export async function fetchCarDealers(): Promise<OverpassNode[]> {
  return query(`node["shop"="car"](around:${RADIUS},${CENTER_LAT},${CENTER_LON});`)
}

export async function fetchLuxuryHomes(): Promise<OverpassNode[]> {
  return query(`node["building"="residential"](around:${RADIUS},${CENTER_LAT},${CENTER_LON});`)
}
