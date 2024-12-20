import { Seat } from "./seat.interface";
export interface BaseReservation {
  id: number;
  user: number;
  insurance: boolean;
} 

export interface Reservation extends BaseReservation {
  seat: number;
}

export interface RetrieveReservation extends BaseReservation {
  seat: Seat;
}