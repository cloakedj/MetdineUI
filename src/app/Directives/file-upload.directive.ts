import { Directive, Output, Input, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { KeepFilesService } from '../services/upload-files/keep-files.service';

@Directive({
  selector: '[appFileUpload]'
})
export class FileUploadDirective {
  constructor(private files : KeepFilesService) {}
  @Output() onFileDropped = new EventEmitter<any>();
	
  @HostBinding('style.background-color') private background = '#f5fcff'
  @HostBinding('style.opacity') private opacity = '1'
  @HostBinding('style.border') private border = '2px dashed black'
	
  //Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8'
  }
	 
  //Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1'
  }
	
  //Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1'
    this.border = '2px solid black'
    let files = evt.dataTransfer.files;
    this.files.getUploadFile(files);
    if (files.length > 0) {
      this.onFileDropped.emit(files)
    }
  }
	
}
