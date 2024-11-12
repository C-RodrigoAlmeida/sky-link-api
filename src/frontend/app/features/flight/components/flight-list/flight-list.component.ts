import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight.interface';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  flights: Flight[] = [];
  loading = true;
  error: string | null = null;
  totalCount = 0;
  
  // Pagination
  currentPage = 1;
  pageSize = 10;
  
  // Filters
  filters = {
    origin: '',
    destination: '',
    airline: '',
    min_price: '',
    max_price: '',
    departure_date: '',
    arrival_date: ''
  };

  constructor(private flightService: FlightService, private router: Router) {}

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights(): void {
    this.loading = true;
    this.error = null;

    let params = new HttpParams()
      .set('page', this.currentPage.toString())
      .set('page_size', this.pageSize.toString());

    // Add filters to params
    Object.entries(this.filters).forEach(([key, value]) => {
      if (value) {
        params = params.set(key, value);
      }
    });

    this.flightService.getFlights(params).subscribe({
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
    this.router.navigate(['/flights', flight.id, 'reserve']);
  }

  // Pagination methods
  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadFlights();
    }
  }

  // Filter methods
  applyFilters(): void {
    this.currentPage = 1; // Reset to first page when filtering
    this.loadFlights();
  }

  resetFilters(): void {
    this.filters = {
      origin: '',
      destination: '',
      airline: '',
      min_price: '',
      max_price: '',
      departure_date: '',
      arrival_date: ''
    };
    this.currentPage = 1;
    this.loadFlights();
  }
} 