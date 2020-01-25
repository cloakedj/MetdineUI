import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
@Injectable({
  providedIn: 'root'
})
export class AuthGuardIsSellerService {
  constructor(
    private api : ApiService,
    private router : Router
  ) { }
  canActivate(route :ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean{
    if(localStorage.getItem("is_seller") === "true") return true;
    this.router.navigateByUrl("/becomeSeller");
    return false;
  }
}
