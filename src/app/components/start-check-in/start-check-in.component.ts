import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CheckInService } from 'src/app/services/check-in.service';

@Component({
  selector: 'app-start-check-in',
  templateUrl: './start-check-in.component.html',
  styleUrls: ['./start-check-in.component.css']
})
export class StartCheckInComponent {

  reservationId: number = 0;
  constructor(private checkInService:CheckInService, private router: Router){ }

  public onClick(id:number){
    this.checkInService.getReservation(id).subscribe(
      reservationData =>{
        console.log(reservationData)
        
        this.router.navigate(['/checkIn'], {
          skipLocationChange: true,
          state: {
            reservationData: JSON.stringify(reservationData)
          }
        });
      }
    );
  }
}
