import { Component, OnDestroy, HostListener } from '@angular/core';
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
  // offline = true;
  // @HostListener('document : offline',['$event'])
  // showOfflineMessage(){
  //   this.offline = true;
  // }
  // @HostListener('document : online',['$event'])
  // hideOfflineMessage(){
  //   this.offline = false;
  // }
  constructor(private loader : LoaderService){
  }
}
