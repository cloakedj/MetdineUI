import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api-service/api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActiveOrderGuardService implements CanActivate{

  constructor(
    private api : ApiService,
  ) { 
  }
  canActivate(route :ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{
    return this.api.checkIfActiveOrder()
    .pipe(
      map((data) =>{
        return data["detail"];
      })
    )
}
}
