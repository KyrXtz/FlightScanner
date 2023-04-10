import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { LoadAirportsService } from 'src/app/services/load-airports.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.css'],
  providers: [DatePipe]
})
export class PassengerDetailsComponent {

  flightData: any;
  passengerDetailsForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private reservationService: ReservationService, private airportsService: LoadAirportsService, private datePipe: DatePipe) {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.reservationService.getFlight(Number.parseInt(params['id'])).subscribe((flight:any) => {
          this.airportsService.getAirports()
            .pipe(
              map((response: any) => response.map((airport: { code: string; name: string; country: string }) => ({
                code: airport.code,
                name: airport.name,
                country: airport.country
              })))
            )
            .subscribe((airports: Array<{ code: string; name: string; country: string }>) => {
              const departureAirport = airports.find(airport => airport.code === flight.departureCity);
              const arrivalAirport = airports.find(airport => airport.code === flight.arrivalCity);
  
              this.flightData = {
                ...flight,
                departureCity: departureAirport ? `${flight.departureCity} - ${departureAirport.name}` : flight.departureCity,
                arrivalCity: arrivalAirport ? `${flight.arrivalCity} - ${arrivalAirport.name}` : flight.arrivalCity
              };
            });
        });
      }
    });
    
    this.passengerDetailsForm = this.formBuilder.group({
      'passengerFirstName': ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z]+$/)]],
      'passengerLastName': ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z]+$/)]],
      'passengerMiddleName': ['', [Validators.pattern(/^[a-zA-Z]*$/)]],
      'passengerEmail': ['', [Validators.required, Validators.email]],
      'passengerPhone': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern(/^[0-9]+$/)]],
    });    

  }
  onSubmit() {
    this.passengerDetailsForm.value.flightId = this.flightData.id;

    this.reservationService.saveReservation(this.passengerDetailsForm.value).subscribe((res: any) => {
      this.router.navigate(['/confirm', res.id])
    })
    console.log(this.passengerDetailsForm.value);
  }
  formatDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'MMMM d, y, h:mm a') ?? "N/A";
  }
}
