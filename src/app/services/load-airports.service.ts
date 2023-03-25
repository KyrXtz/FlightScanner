import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, Observable, of } from 'rxjs';
import { handleError } from '../extensions/extensions';
import { dbPath } from '../resources/constants';

@Injectable({
  providedIn: 'root'
})
export class LoadAirportsService {

  airportsUri:string;
  airportsCache: any = null;

  constructor(private _httpClient:HttpClient) {
    this.airportsUri = dbPath+'airports';
   }

  public getAirports() {
  if (this.airportsCache !== null) {
    return of(this.airportsCache);
  }

  return this._httpClient.get(this.airportsUri)
    .pipe(
      map(response => {
        this.airportsCache = response;
        return response;
      }),
      catchError(handleError)
    );
  }
}
