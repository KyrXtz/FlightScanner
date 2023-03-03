import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { fadeInOut } from './animations/fadeInOut';
import { LoadingIndicatorService } from './services/loading-indicator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[fadeInOut]
})

export class AppComponent {
  title = 'flightServicesFrontend';

  constructor(private loadingIndicatorService: LoadingIndicatorService, private spinner: NgxSpinnerService) { 

    loadingIndicatorService.onLoadingChanged
      .subscribe(isLoading => isLoading ? this.spinner.show() : this.spinner.hide());
  }
}
