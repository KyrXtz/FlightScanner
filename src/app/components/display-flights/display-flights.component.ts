import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { LoadAirportsService } from 'src/app/services/load-airports.service';

@Component({
  selector: 'app-display-flights',
  templateUrl: './display-flights.component.html',
  styleUrls: ['./display-flights.component.css'],
  providers: [DatePipe]
})
export class DisplayFlightsComponent {
  flightsData: any;
  selectedFlightId: number = 0;

  constructor(private router: Router, private datePipe: DatePipe, private airportsService: LoadAirportsService) {
    this.airportsService.getAirports()
      .pipe(
        map((response: any) => 
          response.map((airport: { code: string; name: string; country: string }) => {
            return {
              code: airport.code,
              name: airport.name,
              country: airport.country
            };
          })
        )
      )
      .subscribe((airportsSelected: Array<{ code: string; name: string; country: string }>) => {
        const navigation = this.router.getCurrentNavigation();
        const state = navigation?.extras.state as {
          flightsData: string
        };
        
        const rawFlightsData = JSON.parse(state.flightsData);
        this.flightsData = rawFlightsData.map((flight: any) => {
          const departureAirport = airportsSelected.find(airport => airport.code === flight.departureCity);
          const arrivalAirport = airportsSelected.find(airport => airport.code === flight.arrivalCity);
          
          return {
            ...flight,
            departureCity: departureAirport ? `${flight.departureCity} - ${departureAirport.name}` : flight.departureCity,
            arrivalCity: arrivalAirport ? `${flight.arrivalCity} - ${arrivalAirport.name}` : flight.arrivalCity
          };
        });
      });
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