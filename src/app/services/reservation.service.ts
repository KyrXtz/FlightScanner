import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  flightUri:string = "http://localhost:8080/flightservices/flights";
  reservationtUri:string = "http://localhost:8080/flightservices/reservations";
  constructor(private _httpClient:HttpClient) { }

  public getFlights(from:string , to:string, departureDate:string){
    return this._httpClient.get(this.flightUri+"?from="+from+"&to="+to+"&departureDate="+departureDate)
    .pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  public getFlight(id:number){
    return this._httpClient.get(this.flightUri+"/"+id)
    .pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  public saveReservation(reservation:any){
    return this._httpClient.post(this.reservationtUri,reservation)
    .pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  };
}
