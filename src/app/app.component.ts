import { Component, OnDestroy } from '@angular/core';
import { LoaderService } from './services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  // constructor(private _snackBar : MatSnackBar,
  //   public auth : MetdineInterceptor){}
  // showErrorSnackbar(){
  //   this._snackBar.open(this.auth.errorMessage);
  //   this.auth.errorMessage = '';
  // }
  constructor(private loader : LoaderService){
  }
}