import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import 'summernote';
interface JQuery {
  summernote(options?: any): JQuery;
}



@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  @ViewChild('summernote') summernoteElement!: ElementRef;
  ngOnInit(): void {
    if (this.summernoteElement) {
      $(this.summernoteElement.nativeElement).summernote();
    }
  }

}
