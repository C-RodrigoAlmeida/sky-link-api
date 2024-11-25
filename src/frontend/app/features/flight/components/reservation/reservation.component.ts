import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { ReservationService } from '../../services/reservation.service';
import { BaggageService } from '../../services/baggage.service';
import { Flight } from '../../models/flight.interface';
import { Seat } from '../../models/seat.interface';
import { Itinerary } from '../../models/itinerary.interface';
import { Baggage } from '../../models/baggage.interface';
import { BaggageType } from '../../models/baggage-type.interface';
import { BaggageTypeService } from '../../services/baggage-type.service';

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
  baggages: Baggage[] = [];
  baggageTypes: BaggageType[] = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService,
    private reservationService: ReservationService,
    private baggageTypeService: BaggageTypeService,
    private baggageService: BaggageService
  ) {}

  ngOnInit(): void {
    const flightId = Number(this.route.snapshot.paramMap.get('id'));
    if (!flightId) {
      this.error = 'Invalid flight ID';
      this.loading = false;
      return;
    }
    this.loadBaggageTypes();
    this.loadFlightDetails(flightId);
    this.baggages = this.baggageTypes.map(type => ({
      baggage_type: type
    }));
  }

  loadBaggageTypes(): void {
    this.baggageTypeService.getBaggageTypes().subscribe({
      next: (fetchedBaggageTypes) => {
          this.baggageTypes = fetchedBaggageTypes.results;
          this.loading = false;
          this.addDefaultBaggage();
      },
      error: (error) => {
        this.error = 'Failed to load baggage types';
        console.error('Error loading baggage types:', error);
        this.loading = false;
      }
    })
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

  addDefaultBaggage(): void {
    const defaultBaggage = {
      baggage_type: this.baggageTypes[1]
    }
    this.baggages.push(defaultBaggage as Baggage);
  }

  addBaggage(selectedTypeId: string): void {
    const selectedBaggageType = this.baggageTypes.find(b => b.id === Number(selectedTypeId));
    
    if (selectedBaggageType) {
      const selectedBaggage = {
        baggage_type: selectedBaggageType
      };
      this.baggages.push(selectedBaggage as Baggage);
      console.log('Baggage added:', selectedBaggage);
    }
  } 

  removeBaggage(baggageIndex: number): void {
    this.baggages.splice(baggageIndex, 1);
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
    
    // Calculate total baggage price
    total += this.baggages.reduce((sum, baggage) => {
      return sum + (baggage.baggage_type ? Number(baggage.baggage_type.price) : 0);
    }, 0);
    
    return total;
  }

  onConfirmReservation(): void {
    if (!this.selectedSeat) {
        this.error = 'Please select a seat';
        return;
    }

    const reservation = {
        seat: this.selectedSeat.id,
        insurance: this.includeInsurance,
    };

    this.reservationService.createReservation(reservation).subscribe({
        next: (createdReservation) => {
            this.addBaggageToReservation(createdReservation.id);
            this.router.navigate(['/profile']);
        },
        error: (error) => {
            this.error = 'Failed to create reservation';
            console.error('Error creating reservation:', error);
        }
    });
  }

  addBaggageToReservation(reservationId: number): void {
    this.baggages.forEach(baggage => {
        const baggageData = {
            baggage_type: baggage.baggage_type,
            reservation: reservationId
        };

        this.baggageService.createBaggage(baggageData).subscribe({
            next: () => {
                console.log('Baggage added successfully');
            },
            error: (error) => {
                console.error('Error adding baggage:', error);
            }
        });
    });
  }

  isTransitionRow(rowIndex: number): boolean {
    return (rowIndex === 2 || rowIndex === 6);
  }
}