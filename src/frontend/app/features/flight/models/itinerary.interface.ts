import { Gate } from "../../airport/models/gate.interface";

export interface Itinerary {
    id: number,
    flight: number,
    gate: Gate,
    expected_departure_time: Date,
    expected_arrival_time: Date,
    is_origin: boolean,
    is_destination: boolean
}