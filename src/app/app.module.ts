import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FindFlightsComponent } from './components/find-flights/find-flights.component';
import { PassengerDetailsComponent } from './components/passenger-details/passenger-details.component';
import { DisplayFlightsComponent } from './components/display-flights/display-flights.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReservationService } from './services/reservation.service';
import { StartCheckInComponent } from './components/start-check-in/start-check-in.component';
import { CheckInComponent } from './components/check-in/check-in.component';
import { ConfirmCheckInComponent } from './components/confirm-check-in/confirm-check-in.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckInService } from './services/check-in.service';
import { LoadingIndicatorService } from './services/loading-indicator.service';
import { LoadingIndicatorInterceptor } from './interceptors/LoadingIndicatorInterceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadAirportsService } from './services/load-airports.service';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

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
    FormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FontAwesomeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ReservationService,
    CheckInService,
    LoadingIndicatorService,
    LoadAirportsService,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (service: LoadingIndicatorService) => new LoadingIndicatorInterceptor(service),
      multi: true,
      deps: [LoadingIndicatorService]
    }
   ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, fab);
  }
 }
