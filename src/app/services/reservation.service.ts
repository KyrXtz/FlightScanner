import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, map, throwError } from 'rxjs';
import { dbPath } from '../resources/constants';
import { handleError } from '../extensions/extensions';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  flightUri:string;
  reservationtUri:string;

  constructor(private _httpClient:HttpClient) {
    this.reservationtUri = dbPath+'reservations';
    this.flightUri = dbPath+'flights';
   }

  public getFlights(from:string , to:string, departureDate:string){
    return this._httpClient.get(this.flightUri+"?from="+from+"&to="+to+"&departureDate="+departureDate)
    .pipe(
      map(response => response),
      catchError(handleError)
    );
  }

  public getFlight(id:number){
    return this._httpClient.get(this.flightUri+"/"+id)
    .pipe(
      map(response => response),
      catchError(handleError)
    );
  }

  public saveReservation(reservation:any){
    return this._httpClient.post(this.reservationtUri,reservation)
    .pipe(
      map(response => response),
      catchError(handleError)
    );
  }
}
