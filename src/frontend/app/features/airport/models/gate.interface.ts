import { Airport } from "./airport.interface";

export interface Gate {
  id: number;
  airport: Airport;
  code: string;
  service_fee: number;
} 