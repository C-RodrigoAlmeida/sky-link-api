import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.interface';

@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  flights: Flight[] = [];
  loading = true;
  error: string | null = null;
  totalCount = 0;

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights(): void {
    this.loading = true;
    this.error = null;

    this.flightService.getFlights().subscribe({
      next: (response) => {
        this.flights = response.results;
        this.totalCount = response.count;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load flights. Please try again later.';
        this.loading = false;
        console.error('Error loading flights:', error);
      }
    });
  }

  onSelectFlight(flight: Flight): void {
    // TODO: Implement flight selection logic
    console.log('Selected flight:', flight);
  }
} 