export interface CreditCard {
  id: number;
  user: number; // Assuming user ID is stored
  card_number: string;
  cardholder_name: string;
  expiration_date: string; // Format: YYYY-MM-DD
  cvv: string;
} 