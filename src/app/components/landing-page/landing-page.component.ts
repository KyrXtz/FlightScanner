import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  constructor(private router: Router) { }

  searchForFlights(): void {
    this.router.navigate(['/findFlights'], { skipLocationChange: true });
  }
  
  startCheckIn(): void {
    this.router.navigate(['/startCheckIn'], { skipLocationChange: true });
  }
  
}
