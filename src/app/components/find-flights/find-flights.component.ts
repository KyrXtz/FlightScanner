import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';
import Swal from 'sweetalert2';
import { isNullOrEmptyOrUndefined } from '../../extensions/extensions';
import { LoadAirportsService } from 'src/app/services/load-airports.service';
import { filter, map } from 'rxjs';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-find-flights',
  templateUrl: './find-flights.component.html',
  styleUrls: ['./find-flights.component.css']
})
export class FindFlightsComponent {

  findFlightsForm:FormGroup;
  airports: { code: string, name: string, country: string}[] = [];
  filteredAirports: { code: string, name: string, country: string }[] = [];
  selectedAirports: { code: string, name: string, country: string }[] = [];

  currentControl : string = "";

  minDepartureDate: Date;
  maxDepartureDate: Date;

  faTimesCircle: any;
  constructor(private formBuilder: FormBuilder,
    private reservationService:ReservationService,
    private airportsService:LoadAirportsService,
    private router:Router) {     
      this.faTimesCircle = faCoffee;

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
        .subscribe((airports: Array<{ code: string; name: string; country: string }>) => {
          this.airports = airports;
        });

      this.findFlightsForm = this.formBuilder.group({
        'from' : ['',Validators.required],
        'to' : ['',Validators.required],
        'departureDate': ['',Validators.required]
      })

      this.minDepartureDate = new Date();
      this.maxDepartureDate = new Date();
      this.maxDepartureDate.setMonth(this.minDepartureDate.getMonth() + 3);
      this.findFlightsForm.get('departureDate')?.setValue(this.formatDate(this.minDepartureDate));
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

  clearAirport(controlName: string) {
    const control = this.findFlightsForm.get(controlName);
    this.selectedAirports = this.selectedAirports.filter(airport => airport.code !== control?.value.substring(0, 3));
    control!.enable();
    control!.setValue('');
  }
  
  showClearButton(controlName: string): boolean {
    const control = this.findFlightsForm.get(controlName);
    return control!.disabled;
  }

  minDate(): string {
    return this.formatDate(this.minDepartureDate);
  }

  maxDate(): string {
    return this.formatDate(this.maxDepartureDate);
  }

  onDateSelected(event: any): void {
    let selectedDate = new Date(event.target.value);
    let formattedDate = this.formatDate(selectedDate);
    this.findFlightsForm.get('departureDate')?.setValue(formattedDate);
  }

  private formatDate(date: Date): string {
    let year = date.getFullYear();
    let month = `${date.getMonth() + 1}`.padStart(2, '0');
    let day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  onSubmit(){
    let from = this.findFlightsForm.get('from')?.value.substring(0, 3);
    let to = this.findFlightsForm.get('to')?.value.substring(0, 3);
    let departureDate = this.findFlightsForm.get('departureDate')?.value;

    if (isNullOrEmptyOrUndefined(from) ||
      isNullOrEmptyOrUndefined(to) ||
      isNullOrEmptyOrUndefined(departureDate)){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill out all 3 fields!',
        });
        return;
    }
    this.reservationService.getFlights(from, to, departureDate).subscribe(
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
