import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';
import { airports } from '../../resources/airports';

@Component({
  selector: 'app-find-flights',
  templateUrl: './find-flights.component.html',
  styleUrls: ['./find-flights.component.css']
})
export class FindFlightsComponent {

  findFlightsForm:FormGroup;
  airports: { code: string, name: string, country: string}[] = airports;
  filteredAirports: { code: string, name: string, country: string }[] = [];
  selectedAirports: { code: string, name: string, country: string }[] = [];

  currentControl : string = "";

  constructor(private formBuilder: FormBuilder, private reservationService:ReservationService, private router:Router) { 
   this.findFlightsForm = this.formBuilder.group({
     'from' : ['',Validators.required],
     'to' : ['',Validators.required],
     'departureDate': ['',Validators.required]
   })
  }

  filterAirports(event: any) {
    let query = event.target.value.toLowerCase(); 
    let selectedCodes = this.selectedAirports.map(airport => airport.code);

    if (query) {
      this.currentControl = event.target.name;
      this.filteredAirports = this.airports.filter(airport =>
        (airport.name.toLowerCase().includes(query) || airport.code.toLowerCase().includes(query))
          && !selectedCodes.includes(airport.code)
      ).sort((a, b) => {
        const diffA = Math.abs(a.code.toLowerCase().indexOf(query) - query.length);
        const diffB = Math.abs(b.code.toLowerCase().indexOf(query) - query.length);
        return diffA - diffB;
      }).sort((a, b) => {
        return a.code.localeCompare(b.code);
      });
    } else {
      this.filteredAirports = []; 
      this.currentControl = "";
    }
  }
  
  selectAirport(airport: any) {
    let control = this.findFlightsForm.get(this.currentControl);
    control!.setValue(`${airport.code} - ${airport.name}`); 
    control!.disable();

    this.selectedAirports.push({ code: airport.code, name: airport.name, country: airport.country });

    this.filteredAirports = []; 
    this.currentControl = "";
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
