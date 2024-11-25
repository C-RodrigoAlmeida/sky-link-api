import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { RetrieveReservation } from '../../models/reservation.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-reservations',
    standalone: true,
    imports: [CommonModule, FormsModule, NgxPaginationModule],
    templateUrl: './reservations.component.html',
    styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent implements OnInit {
  reservations: RetrieveReservation[] = [];
  loading = true;
  error: string | null = null;
  totalCount = 0;

  // Pagination
  currentPage = 1;
  pageSize = 10;

  // Filters
  filters = {
    reservationId: '',
    seatCode: '',
    insurance: ''
  };

  constructor(private reservationService: ReservationService, private router: Router) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
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

    this.reservationService.getReservations(params).subscribe({
      next: (response) => {
        this.reservations = response.results;
        console.log(this.reservations)
        this.totalCount = response.count;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load reservations. Please try again later.';
        this.loading = false;
        console.error('Error loading reservations:', error);
      }
    });
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadReservations();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  applyFilters(): void {
    this.currentPage = 1; // Reset to first page when filtering
    this.loadReservations();
  }

  resetFilters(): void {
    this.filters = {
      reservationId: '',
      seatCode: '',
      insurance: ''
    };
    this.currentPage = 1;
    this.loadReservations();
  }

  reservationDetail(reservation: RetrieveReservation): void {
    this.router.navigate(['reservation', reservation.id])
  }
} 