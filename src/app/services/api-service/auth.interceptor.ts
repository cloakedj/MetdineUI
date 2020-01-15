import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private api : ApiService;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.api.checkUserToken() !== null)
    {
            console.log("interceptying");
    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': `${this.api.checkUserToken()}`,
      },
    });
    }
    else
    {
    req = req.clone({
    setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
    },
    });
    }
    return next.handle(req);
  }
}