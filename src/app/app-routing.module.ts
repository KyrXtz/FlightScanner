import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { DisplayFlightsComponent } from './components/display-flights/display-flights.component';
import { FindFlightsComponent } from './components/find-flights/find-flights.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PassengerDetailsComponent } from './components/passenger-details/passenger-details.component';

const routes: Routes = [
  {path:'', redirectTo:'findFlights', pathMatch:'full'},
  {path:'findFlights', component:FindFlightsComponent},
  {path:'displayFlights', component:DisplayFlightsComponent},
  {path:'passengerDetails/:id', component:PassengerDetailsComponent},
  {path:'confirm/:id', component:ConfirmComponent},
  {path: '**', component:NotFoundComponent } // fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
