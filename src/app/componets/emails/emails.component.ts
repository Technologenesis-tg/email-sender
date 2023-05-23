import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css']
})
export class EmailsComponent {
  screen = 'inbox'
  selectedFiles: File[] = [];
  inbox:any;
  email_details :any;
constructor(private request:RequestService){}

  ngOnInit(): void {

this.request.post('email/inbox',true).subscribe((res:any)=>{
  this.inbox = res;
})

  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    this.handleFiles(files);
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    this.handleFiles(files);
  }

  handleFiles(files: FileList | null | undefined) {
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.selectedFiles.push(files[i]);
      }
    }
  }
  getPreviewURL(file: File): string {
    return URL.createObjectURL(file);
  }
  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }
get_email(id:any){
  this.screen = 'mail-detail'
  this.request.get('email/detail/'+id).subscribe((res:any)=>{
    this.email_details = res;
    console.log(this.email_details.text);
  })
}

}






