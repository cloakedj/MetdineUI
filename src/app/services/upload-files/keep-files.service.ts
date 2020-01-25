import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeepFilesService {
  File : File;
  constructor() { }
  getUploadFile(file : File){
    console.log(file);
    this.File = file;
  }
}
