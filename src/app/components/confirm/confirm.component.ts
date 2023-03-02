import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {

  reservationId : number = 0;

  constructor( private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params =>{
      if(params['id']){
        this.reservationId = Number.parseInt(params['id']);
      }
    })
  }
}
