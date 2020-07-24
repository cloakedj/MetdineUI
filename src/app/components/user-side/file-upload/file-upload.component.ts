import { Component, OnInit, OnDestroy, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { KeepFilesService } from 'src/app/services/upload-files/keep-files.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit,OnDestroy{
  files: any = [];
  @Output()  imageUpload  : EventEmitter<boolean> = new EventEmitter();
  imageTypeError: boolean = false;

  uploadFile(event, byInput?: string) {
    this.imageUpload.emit(true);
  let fileCtrl = event.target.files || event.dataTransfer.files;
  for (let index = 0; index < fileCtrl.length; index++) {
  const element = event.target.files[index];
    if (element.type.split("/")[0] !== "image") {
      this.imageTypeError = true;
      this.imageUpload.emit(false);
    }
    else {
      this.imageTypeError = false;
      const reader = new FileReader();
      if (byInput) {
        reader.readAsDataURL(event.target.files[index]);
        reader.onload = () => {
          this.filesUpload.getUploadFile(reader.result);
          this.cd.markForCheck();
        };
      }
      this.files.push(element.name);
  }
  }
  event.target.value = "";
  }

  deleteAttachment(index) {
  this.files.splice(index, 1);
  this.filesUpload.Files.splice(index,1);
  this.imageUpload.emit(false);
  }
  constructor(public filesUpload : KeepFilesService,
    private cd : ChangeDetectorRef) { }

  ngOnInit() {
  }
  ngOnDestroy(){
    this.filesUpload.Files = [];
  }

}
