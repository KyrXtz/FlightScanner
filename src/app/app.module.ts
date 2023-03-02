import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FindFlightsComponent } from './components/find-flights/find-flights.component';
import { PassengerDetailsComponent } from './components/passenger-details/passenger-details.component';
import { DisplayFlightsComponent } from './components/display-flights/display-flights.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReservationService } from './services/reservation.service';

@NgModule({
  declarations: [
    AppComponent,
    FindFlightsComponent,
    PassengerDetailsComponent,
    DisplayFlightsComponent,
    ConfirmComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule  
  ],
  providers: [ReservationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
