import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { fadeInOut } from './animations/fadeInOut';
import { LoadingIndicatorService } from './services/loading-indicator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[fadeInOut]
})

export class AppComponent {
  title = 'flightScanner';

  constructor(private router: Router, private loadingIndicatorService: LoadingIndicatorService, private spinner: NgxSpinnerService) { 

    loadingIndicatorService.onLoadingChanged
      .subscribe(isLoading => isLoading ? this.spinner.show() : this.spinner.hide());

      this.router.navigate(['/landingPage'], { skipLocationChange: true });
  }
}
