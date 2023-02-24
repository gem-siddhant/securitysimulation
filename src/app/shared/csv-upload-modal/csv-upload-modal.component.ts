import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeExcelData } from 'src/app/modules/main/employee-csv/employee-client.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-csv-upload-modal',
  templateUrl: './csv-upload-modal.component.html',
  styleUrls: ['./csv-upload-modal.component.css'],
})
export class CsvUploadModalComponent implements OnInit {
  csvError: string;
  changeTriggered: boolean;
  submitted: boolean;
  excelData : EmployeeExcelData[];
  constructor(private dialogRef: MatDialogRef<CsvUploadModalComponent>) {
    this.csvError = '';
    this.changeTriggered = false;
    this.submitted = false;
    this.excelData = [] as EmployeeExcelData[];
  }

  ngOnInit(): void {}

  onChange(event: any): void {
    this.csvError = '';
    this.changeTriggered = true;
    let file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (ev: any) => {
      console.log(ev);
      let binaryData = ev.target.result;
      let workbook = XLSX.read(binaryData, { type: 'binary' });
      workbook.SheetNames.forEach((sheet) => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]) as EmployeeExcelData[];
        this.excelData = data;
      });
    };
  }

  updateCsv(): void {
    this.submitted = true;
    if (this.changeTriggered && this.csvError === '') {
      this.dialogRef.close({ sendClicked: true, employeeCsvData: this.excelData });
    }
  }
  close(): void {
    this.dialogRef.close({ sendClicked: false });
  }
  downloadXlsx(): void {
    window.open('../../../assets/pdf/sample-employee-csv.xlsx');
  }
}
