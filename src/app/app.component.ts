import { Component } from '@angular/core';
import { fadeInOut } from './animations/fadeInOut';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[fadeInOut]
})
export class AppComponent {
  title = 'flightServicesFrontend';
}
