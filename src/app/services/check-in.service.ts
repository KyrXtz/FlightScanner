import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  reservationtUri:string = "http://localhost:8080/flightservices/reservations";

  constructor(private _httpClient: HttpClient) { }
  
  public getReservation(id:number){
    return this._httpClient.get(this.reservationtUri+'/'+id)
    .pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  public checkIn(checkInRequest:any){
    return this._httpClient.put(this.reservationtUri,checkInRequest)
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
