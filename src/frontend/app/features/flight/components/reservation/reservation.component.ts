import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { SeatService } from '../../services/seat.service';
import { ReservationService } from '../../services/reservation.service';
import { Flight } from '../../models/flight.interface';
import { Seat } from '../../models/seat.interface';
import { switchMap, forkJoin } from 'rxjs';

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
  loading = true;
  error: string | null = null;
  selectedSeat: Seat | null = null;
  includeInsurance = false;

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

  private loadFlightDetails(flightId: number): void {
    forkJoin({
      flight: this.flightService.getFlight(flightId),
      seats: this.seatService.getSeats()
    }).subscribe({
      next: (response) => {
        this.flight = response.flight;
        this.seats = response.seats.results.filter(seat => seat.flight === flightId);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load flight details';
        this.loading = false;
        console.error('Error loading flight details:', error);
      }
    });
  }

  onSeatSelect(seat: Seat): void {
    this.selectedSeat = seat;
  }

  toggleInsurance(): void {
    this.includeInsurance = !this.includeInsurance;
  }

  getTotalPrice(): number {
    let total = this.selectedSeat?.price || 0;
    if (this.includeInsurance) {
      total += 50; // Example insurance price
    }
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
} 