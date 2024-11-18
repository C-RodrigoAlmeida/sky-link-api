import { Itinerary } from "../models/itinerary.interface";

export interface Reservation {
  id: number;
  user: number;
  seat: number;
  insurance: boolean;
} 