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
  constructor(private Auth: AuthService){}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authenticatedRequest = this.Auth.Auth_T !== '' ? request.clone({
      setHeaders : {
        Authorization : `Token ${this.Auth.Auth_T}`
      }
      })
      : request.clone(request);
    //logging the updated Parameters to browser's console
    console.log("Before making api call : ", authenticatedRequest);
    return next.handle(authenticatedRequest).pipe(
      tap(
        event => {
          //logging the http response to browser's console in case of a success
          if (event instanceof HttpResponse) {
            console.log("api call success :", event);
          }
        },
        error => {
          //logging the http response to browser's console in case of a failuer
          if (event instanceof HttpResponse) {
            console.log("api call error :", event);
          }
        }
      )
    );
 
 }

}