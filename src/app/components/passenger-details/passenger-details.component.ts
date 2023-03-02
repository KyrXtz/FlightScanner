import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.css']
})
export class PassengerDetailsComponent {

  flightData:any;
  passengerDetailsForm:FormGroup;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private reservationService: ReservationService) {
    this.activatedRoute.params.subscribe(params =>{
      if(params['id']){
        this.reservationService.getFlight(Number.parseInt(params['id'])).subscribe(res=>{
          this.flightData = res;
        });
      }
    })

    this.passengerDetailsForm = this.formBuilder.group({
      'firstName' : ['',Validators.required],
      'lastName' : ['',Validators.required],
      'middleName': ['',Validators.required],
      'email': ['',Validators.required],
      'passengerPhone': ['',Validators.required],
    })

  }
  onSubmit(){
    this.passengerDetailsForm.value.flightId = this.flightData.id;
    
    this.reservationService.saveReservation(this.passengerDetailsForm.value).subscribe((res : any) => {
      this.router.navigate(['/confirm',res.id])
    })
    console.log(this.passengerDetailsForm.value);
  }
}

