import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckInComponent } from './components/check-in/check-in.component';
import { ConfirmCheckInComponent } from './components/confirm-check-in/confirm-check-in.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { DisplayFlightsComponent } from './components/display-flights/display-flights.component';
import { FindFlightsComponent } from './components/find-flights/find-flights.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PassengerDetailsComponent } from './components/passenger-details/passenger-details.component';
import { StartCheckInComponent } from './components/start-check-in/start-check-in.component';

const routes: Routes = [
  {path:'', redirectTo:'landingPage', pathMatch:'full'},
  {path:'landingPage', component:LandingPageComponent},
  {path:'findFlights', component:FindFlightsComponent},
  {path:'displayFlights', component:DisplayFlightsComponent},
  {path:'passengerDetails/:id', component:PassengerDetailsComponent},
  {path:'confirm/:id', component:ConfirmComponent},
  {path:'startCheckIn', component:StartCheckInComponent},
  {path:'checkIn', component:CheckInComponent},
  {path:'confirmCheckIn', component:ConfirmCheckInComponent},
  {path: '**', component:NotFoundComponent } // fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
