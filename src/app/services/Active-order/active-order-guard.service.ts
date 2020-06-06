import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api-service/api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActiveOrderGuardService implements CanActivateChild{

  constructor(
    private api : ApiService,
    private router : Router,
  ) {
  }
  canActivateChild(route :ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{
    return this.api.checkIfActiveOrder()
    .pipe(
      map((data) =>{
        if(data["detail"] == false)  {
          this.router.navigate(["/user"]);
          return false;
        }
        return true;
      })
    )
}
}
