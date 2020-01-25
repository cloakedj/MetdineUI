import { Component, OnInit } from '@angular/core';
import { KeepFilesService } from 'src/app/services/upload-files/keep-files.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {  
  files: any = [];

  uploadFile(event,byInput ?: string) {
  for (let index = 0; index < event.length; index++) {
  const element = event[index];
  if(byInput) this.filesUpload.getUploadFile(event[0]);
  this.files.push(element.name)
  }  
  }
  deleteAttachment(index) {
  this.files.splice(index, 1)
  }
  constructor(private filesUpload : KeepFilesService) { }

  ngOnInit() {
  }

}
