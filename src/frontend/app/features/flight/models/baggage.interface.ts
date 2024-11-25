import { BaggageType } from "./baggage-type.interface";

export interface Baggage {
  id?: number;
  baggage_type: BaggageType;
  reservation?: number;
} 