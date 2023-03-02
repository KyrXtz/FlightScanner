import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-flights',
  templateUrl: './display-flights.component.html',
  styleUrls: ['./display-flights.component.css']
})
export class DisplayFlightsComponent {
  
  flightsData:any;
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      flightsData: string
    };
    this.flightsData = JSON.parse(state.flightsData);
  }

  ngOnInit() {
  }
}
