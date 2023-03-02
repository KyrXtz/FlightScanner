import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FindFlightsComponent } from './components/find-flights/find-flights.component';
import { PassengerDetailsComponent } from './components/passenger-details/passenger-details.component';
import { DisplayFlightsComponent } from './components/display-flights/display-flights.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReservationService } from './services/reservation.service';
import { StartCheckInComponent } from './components/start-check-in/start-check-in.component';
import { CheckInComponent } from './components/check-in/check-in.component';
import { ConfirmCheckInComponent } from './components/confirm-check-in/confirm-check-in.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FindFlightsComponent,
    PassengerDetailsComponent,
    DisplayFlightsComponent,
    ConfirmComponent,
    NotFoundComponent,
    StartCheckInComponent,
    CheckInComponent,
    ConfirmCheckInComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule  
  ],
  providers: [ReservationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
