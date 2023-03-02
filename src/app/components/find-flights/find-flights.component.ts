import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-find-flights',
  templateUrl: './find-flights.component.html',
  styleUrls: ['./find-flights.component.css']
})
export class FindFlightsComponent {

  findFlightsForm:FormGroup;

  constructor(private formBuilder: FormBuilder, private reservationService:ReservationService, private router:Router) { 
   this.findFlightsForm = this.formBuilder.group({
     'from' : ['',Validators.required],
     'to' : ['',Validators.required],
     'departureDate': ['',Validators.required]
   })
  }

  onSubmit(){
    let data = this.findFlightsForm.value;
    this.reservationService.getFlights(data.from, data.to, data.departureDate).subscribe(
      flightsData =>{
        let navigationExtras: NavigationExtras = {
          state: {
            flightsData: JSON.stringify(flightsData)
          }
        };
        this.router.navigate(['/displayFlights'], navigationExtras);
      }
    );
  }
}
