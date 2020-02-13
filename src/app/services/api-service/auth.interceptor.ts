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
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class MetdineInterceptor implements HttpInterceptor{
  constructor(private Auth: AuthService,
    private toastr : ToastrService){}
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
            console.log(event.body);
            console.log("api call success :", event);
          }
        },
        error => {
          let errorm = error.error.non_field_errors ? error.error.non_field_errors : error.error.password1[0] ;
          if(error.status >= 500)
            errorm = "Something Went Wrong. Try Again later";
            this.toastr.error(errorm);
        },
      )
    );
 
 }

}