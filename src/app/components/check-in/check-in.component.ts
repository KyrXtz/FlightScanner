import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { CheckInService } from 'src/app/services/check-in.service';
import { LoadAirportsService } from 'src/app/services/load-airports.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css'],
  providers: [DatePipe]
})
export class CheckInComponent {

  reservationData:any;
  checkInForm:FormGroup;
  airports: { code: string, name: string, country: string}[] = [];

  constructor(private formBuilder:FormBuilder,
     private router: Router,
     private checkInService:CheckInService,
     private airportsService:LoadAirportsService,
     private datePipe: DatePipe) {
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

        const navigation = this.router.getCurrentNavigation();
        const state = navigation?.extras.state as {
          reservationData: string
        };
        this.reservationData = JSON.parse(state.reservationData);

        this.checkInForm = this.formBuilder.group({
          'numberOfBags' : ['',[Validators.required,Validators.minLength(1), Validators.maxLength(2)]]
        })

  }

  public checkIn(){
    this.checkInForm.value.id = this.reservationData.id;
    this.checkInForm.value.checkIn = true;

    this.checkInService.checkIn(this.checkInForm.value).subscribe((res : any) => {
      this.router.navigate(['/confirmCheckIn'], { skipLocationChange: true })
    })
  }
  formatDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'MMMM d, y, h:mm a') ?? "N/A";
  }

  getCity(airportCode: string){
    const airport = this.airports.filter(ap => ap.code === airportCode)[0];
    return airport ? `${airportCode} - ${airport.name}` : airportCode;
  }
}
