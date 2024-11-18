import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { SeatService } from '../../services/seat.service';
import { ReservationService } from '../../services/reservation.service';
import { Flight } from '../../models/flight.interface';
import { Seat } from '../../models/seat.interface';
import { Itinerary } from '../../models/itinerary.interface';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  flight: Flight | null = null;
  seats: Seat[] = [];
  itineraries: Itinerary[] = [];
  loading = true;
  error: string | null = null;
  selectedSeat: Seat | null = null;
  includeInsurance = false;
  seatLayout: Seat[][] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService,
    private seatService: SeatService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    const flightId = Number(this.route.snapshot.paramMap.get('id'));
    if (!flightId) {
      this.error = 'Invalid flight ID';
      this.loading = false;
      return;
    }

    this.loadFlightDetails(flightId);
  }

  loadFlightDetails(flightId: number): void {
    this.flightService.getFlight(flightId).subscribe({
      next: (flight) => {
        this.flight = flight;
        this.seats = flight.seats;
        this.seatLayout = this.generateSeatLayout(this.seats);
        this.itineraries = flight.itineraries;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load flight details';
        console.error('Error loading flight details:', error);
        this.loading = false;
      }
    });
  }

  generateSeatLayout(seats: Seat[]): Seat[][] {
    const layout: Seat[][] = [];
    const seatsPerRow = 6;
    
    for (let i = 0; i < seats.length; i += seatsPerRow) {
      layout.push(seats.slice(i, i + seatsPerRow));
    }
    return layout;
  }

  onSeatSelect(seat: Seat): void {
    this.selectedSeat = seat;
  }

  toggleInsurance(): void {
    this.includeInsurance = !this.includeInsurance;
  }

  getTotalPrice(): number {
    let total = Number(this.selectedSeat?.price) || 0;
    if (this.includeInsurance) total += 50;
    
    return total;
  }

  onConfirmReservation(): void {
    if (!this.selectedSeat) {
      this.error = 'Please select a seat';
      return;
    }

    const reservation = {
      seat: this.selectedSeat.id,
      insurance: this.includeInsurance
    };

    this.reservationService.createReservation(reservation).subscribe({
      next: () => {
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        this.error = 'Failed to create reservation';
        console.error('Error creating reservation:', error);
      }
    });
  }

  isTransitionRow(rowIndex: number): boolean {
    // Assuming the first two rows are First Class, next four are Business, and the rest are Economy
    return (rowIndex === 2 || rowIndex === 6); // Adjust based on your row indexing
  }
} 