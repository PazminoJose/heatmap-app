export interface Coordinates {
    lat: number,
    lng: number
}
export interface CoordinatesAndAPIKeyResponse {
    api_key: string,
    coordinates: Array<Coordinates>
}
export interface MapProps {
    center: Coordinates,
    zoom: number
}
