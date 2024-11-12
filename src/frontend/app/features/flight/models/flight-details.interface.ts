import { Flight } from "./flight.interface";
import { Seat } from "./seat.interface";

export interface FlightDetails extends Flight {
  seats: Seat[];
  total_price: number;
  available_seats: number;
  airline_name: string;
} 