import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { ReservationService } from '../../services/reservation.service';
import { Flight } from '../../models/flight.interface';
import { RetrieveReservation } from '../../models/reservation.interface';

@Component({
  selector: 'app-reservation-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent implements OnInit {
  reservation: RetrieveReservation | null = null;
  flight: Flight | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private flightService: FlightService
  ) {}

  ngOnInit(): void {
    const reservationId = Number(this.route.snapshot.paramMap.get('id'));
    if (!reservationId) {
      this.error = 'Invalid reservation ID';
      this.loading = false;
      return;
    }

    this.loadReservationDetails(reservationId);
  }

  loadReservationDetails(reservationId: number): void {
    this.reservationService.getReservation(reservationId).subscribe({
      next: (reservation) => {
        this.reservation = reservation;
        this.loadFlightDetails(reservation.seat.flight);
      },
      error: (error) => {
        this.error = 'Failed to load reservation details';
        console.error('Error loading reservation details:', error);
        this.loading = false;
      }
    });
  }

  loadFlightDetails(flightId: number): void {
    this.flightService.getFlight(flightId).subscribe({
      next: (flight) => {
        this.flight = flight;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load flight details';
        console.error('Error loading flight details:', error);
        this.loading = false;
      }
    });
  }
} 