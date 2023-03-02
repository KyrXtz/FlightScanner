import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckInService } from 'src/app/services/check-in.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent {

  reservationData:any;
  checkInForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private router: Router, private checkInService:CheckInService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      reservationData: string
    };
    this.reservationData = JSON.parse(state.reservationData);

    this.checkInForm = this.formBuilder.group({
      'numberOfBags' : ['',Validators.required]
    })

  }

  public checkIn(){
    this.checkInForm.value.id = this.reservationData.id;
    this.checkInForm.value.checkIn = true;

    this.checkInService.checkIn(this.checkInForm.value).subscribe((res : any) => {
      this.router.navigate(['/confirmCheckIn'])
    })
  }

}
