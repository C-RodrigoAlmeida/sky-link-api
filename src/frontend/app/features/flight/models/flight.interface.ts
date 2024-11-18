import { Itinerary } from "./itinerary.interface";
import { Seat } from "./seat.interface";

export interface Flight {
  id: number;
  airline: number;
  origin: string;
  destination: string;
  duration: number;
  departure: Date;
  arrival: Date;
  seats: Seat[];
  itineraries: Itinerary[];
} 