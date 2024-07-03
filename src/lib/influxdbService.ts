export async function fetchInfluxData() {
    const response  = await fetch('/api/query');
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return await response.json() as InfluxData[];
}

export interface InfluxData {
    result: string
    table: number
    _time: string
    _start: string
    _stop: string
    _measurement: string
    _id: string
    app: string
    brand: string
    createdAt: string
    model: string
    plate: string
    updatedAt: string
    acceleration: number
    created_at_pour_les_relous: number
    lat: number
    lon: number
    mileage: number
    speed: number
    updated_at_pour_les_relous: number
    year: number
}