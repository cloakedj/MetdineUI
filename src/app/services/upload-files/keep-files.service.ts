import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeepFilesService {
  File : any;
  constructor() { }
  getUploadFile(file){
    this.File = file;
  }
}
