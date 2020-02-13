import { Injectable } from '@angular/core';
import { NgxUiLoaderConfig, NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  config : NgxUiLoaderConfig;
  constructor(private loader : NgxUiLoaderService){
    this.config = this.loader.getDefaultConfig();
    this.config.pbColor = 'purple';
    this.config.bgsColor = 'red';
    this.config.fgsColor = 'purple';
    this.config.fgsType = 'square-jelly-box';
    this.config.bgsType = 'ball-scale-multiple';
    this.config.bgsSize = 200;
    this.config.bgsPosition = 'center-center';
  }
}
