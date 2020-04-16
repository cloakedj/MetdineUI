import { ApiService } from 'src/app/services/api-service/api.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntil, switchMap, catchError } from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { timer, Observer, Subject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckImageStatusService {

}
