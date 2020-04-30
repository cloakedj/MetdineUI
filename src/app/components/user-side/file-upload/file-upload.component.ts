import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { KeepFilesService } from 'src/app/services/upload-files/keep-files.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  files: any = [];
  @Output()  imageUpload  : EventEmitter<boolean> = new EventEmitter();

  uploadFile(event,byInput ?: string) {
  this.imageUpload.emit(true);
  for (let index = 0; index < event.target.files.length; index++) {
  const element = event.target.files[index];
  const reader = new FileReader();
  if(byInput){
      reader.readAsDataURL(event.target.files[index]);
      reader.onload = () => {
        this.filesUpload.getUploadFile(reader.result);
        this.cd.markForCheck();
      };
    }
    this.files.push(element.name);
  }
  event.target.value = "";
  }

  deleteAttachment(index) {
  this.files.splice(index, 1);
  this.filesUpload.Files.splice(index,1);
  this.imageUpload.emit(false);
  }
  constructor(private filesUpload : KeepFilesService,
    private cd : ChangeDetectorRef) { }

  ngOnInit() {
  }

}
