import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeepFilesService {
  Files : any[] = [];
  constructor() { }
  getUploadFile(file){
    this.Files.push(file);
  }
}
