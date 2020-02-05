import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../auth-service/auth-service.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private api : ApiService,
    private auth : AuthService,
    private router : Router
  ) { }
  canActivate(route :ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean{
    if (localStorage.getItem("seller_mode_active")) localStorage.removeItem("seller_mode_active");
    return  this.api.checkIfActiveOrder().pipe(
      map((data) => {
        return data["detail"]
      })
    )
    if(this.api.checkUserToken()) {
      this.router.navigate(['/user'])
      return true;
    }
    else { 
      this.router.navigateByUrl("/userGateway/(userGatewayRouter:login)");
    }
    return false;
  }
}