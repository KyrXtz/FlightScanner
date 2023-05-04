import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { handleError } from '../extensions/extensions';
import { dbPath } from '../resources/constants';

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  reservationtUri:string;

  constructor(private _httpClient: HttpClient) {
    this.reservationtUri = dbPath+'reservations';
   }
  
  public getReservation(id:number){
    return this._httpClient.get(this.reservationtUri+'/'+id)
    .pipe(
      map(response => response),
      catchError((error) => handleError(error, 'Failed to get reservation. Please check the reservation code and try again.'))
    );
  }

  public checkIn(checkInRequest:any){
    return this._httpClient.put(this.reservationtUri,checkInRequest)
    .pipe(
      map(response => response),
      catchError((error) => handleError(error, undefined))
    );
  }

}