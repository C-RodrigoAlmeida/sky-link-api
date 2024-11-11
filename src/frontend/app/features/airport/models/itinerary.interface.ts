export interface Itinerary {
  id: number;
  flight: number;
  gate: number;
  expected_departure_time: string | null;
  expected_arrival_time: string | null;
  is_origin: boolean;
  is_destination: boolean;
} 