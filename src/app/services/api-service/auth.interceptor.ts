import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { AuthService } from '../auth-service/auth-service.service';

@Injectable()
export class MetdineInterceptor implements HttpInterceptor{
  errorMessage : any;
  errorStatus : any;
  constructor(private Auth: AuthService){}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authenticatedRequest = this.Auth.Auth_T ? request.clone({
      setHeaders : {
        Authorization : `Token ${this.Auth.Auth_T}`,
      }
      })
      : request.clone({
         setHeaders : {
          "Content-Type" : "application/json"
         }
      });
      console.log("before making request",authenticatedRequest);
    return next.handle(authenticatedRequest).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            console.log("api call success :", event);
          }
        },
        error => {
          console.log(event);
            this.errorStatus = error.status;
            this.errorMessage = error.statusText;
        },
      )
    );
 
 }

}