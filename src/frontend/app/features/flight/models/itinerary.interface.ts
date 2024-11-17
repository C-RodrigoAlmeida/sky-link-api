export interface Itinerary {
    id: number,
    flight: number,
    gate: number,
    expected_departure_time: Date,
    expected_arrival_time: Date,
    is_origin: boolean,
    is_destination: boolean
}