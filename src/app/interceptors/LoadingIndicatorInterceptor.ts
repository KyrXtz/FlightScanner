import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { LoadingIndicatorService } from "../services/loading-indicator.service";

@Injectable()
export class LoadingIndicatorInterceptor implements HttpInterceptor {
  
  constructor(private loadingIndicatorService: LoadingIndicatorService) {}
  
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // emit onStarted event before request execution
    this.loadingIndicatorService.onStarted(req);
    
    return next
      .handle(req)
      // emit onFinished event after request execution
      .pipe(finalize(() => this.loadingIndicatorService.onFinished(req)));
  }
  
}