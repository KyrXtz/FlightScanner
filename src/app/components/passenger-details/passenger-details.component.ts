import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.css']
})
export class PassengerDetailsComponent {

  flightData:any;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if(params['flightData']){
        let flightData = params['flightData'];
        console.log(flightData);
        this.flightData = flightData;
        // Use the flightsData here
      }
    });
  }   
}
