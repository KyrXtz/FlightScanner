import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckInService } from 'src/app/services/check-in.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css'],
  providers: [DatePipe]
})
export class CheckInComponent {

  reservationData:any;
  checkInForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private router: Router, private checkInService:CheckInService, private datePipe: DatePipe) {
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
  formatDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'MMMM d, y, h:mm a') ?? "N/A";
  }

}
