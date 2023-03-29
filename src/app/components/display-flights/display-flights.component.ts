import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-flights',
  templateUrl: './display-flights.component.html',
  styleUrls: ['./display-flights.component.css'],
  providers: [DatePipe]
})
export class DisplayFlightsComponent {
  flightsData: any;
  selectedFlightId: number = 0;

  constructor(private router: Router, private datePipe: DatePipe) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      flightsData: string
    };
    this.flightsData = JSON.parse(state.flightsData);
    console.log(this.flightsData);
  }

  onSelect(id: number): any {
    this.router.navigate(['/passengerDetails', id]);
  }

  goBack(): void {
    this.router.navigate(['/findFlights']);
  }

  formatDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'MMMM d, y, h:mm a') ?? "N/A";
  }

  onFlightClick(id: number): void {
    this.selectedFlightId = id;
  }
}