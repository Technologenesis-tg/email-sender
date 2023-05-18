import { Component, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { RequestService } from 'src/app/services/request.service';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
;


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers:[NgbActiveModal]
})
export class CompanyComponent {
  @ViewChild('content') modalContent!: NgbModalRef;
  screen:any ='add-company'
  selectedFile: File | null = null;
  jsonData: any[] = [];
  selectedCategory: any = 'Company';
  mappedData: any[] = [];
  categories: string[] = ['Category 1', 'Category 2', 'Category 3'];

  constructor(public request:RequestService , private modalService: NgbModal, private activeModal: NgbActiveModal){}

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
    }
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }
  onProcessData() {
    if (this.selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: 'binary' });
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];
          this.jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
          // Map the data to the required format for the API
          this.mappedData = this.jsonData
            .slice(1)
            .map((row) => ({
              name: row[1] || '',
              designation: row[2] || '',
              country: row[3] || '',
              email: row[4] || '',
              phone_number: row[5] || ''
            }))
            .filter((row) => Object.values(row).some((cell) => !!cell));
  
          console.log('Processed data:', this.mappedData);
        }
      };
      fileReader.readAsBinaryString(this.selectedFile);
    }
  }
  
  


  onSaveAsJson() {
    const blob = new Blob([JSON.stringify(this.jsonData)], { type: 'application/json' });
    saveAs(blob, 'excelData.json');
  }
    
  onClear() {
    this.selectedFile = null;
    this.jsonData = [];
    this.mappedData = [];
  }


  onSend(){
    let data;
    this.request.post('company/add' , data ,true).subscribe((res:any)=>{
      console.log(res)
    })
  }





  openModal(): void {
    this.modalService.open(this.modalContent).result.then(
      (result) => {
        console.log('Modal closed with result:', result);
      },
      (reason) => {
        console.log('Modal dismissed with reason:', reason);
      }
    );
  }

  submitForm(): void {
    console.log('Selected Category:', this.selectedCategory);
    // Additional logic to handle the submitted category
  }
}
