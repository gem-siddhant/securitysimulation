import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
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
  emailcheck : boolean = false;
  matOptionSet : Map<string,boolean>;
  constructor(private dialogRef: MatDialogRef<CsvUploadModalComponent>,
    private toastr:ToastrService,) {
    this.csvError = '';
    this.changeTriggered = false;
    this.submitted = false;
    this.excelData = [] as EmployeeExcelData[];
    this.matOptionSet = new Map<string,boolean>();
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
      for(var i=0;i<this.excelData.length;i++)
      {
        let email = this.excelData[i].username
        this.emailcheck = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,})+$/.test(email)
        console.log(this.emailcheck)
        if(this.emailcheck==false)
        {
          console.log(this.emailcheck)
          this.toastr.error("Email id provided is not in correct format",undefined,
          {
            positionClass: 'toast-top-center'
          }
          );
          return
        }
      }
    };
  }

  updateCsv(): void {
    this.submitted = true;
    if (this.changeTriggered && this.csvError === '') {
      this.dialogRef.close({ 
        sendClicked: true, 
        employeeCsvData: this.excelData, 
        onBoardEmployees : this.matOptionSet.get('onboard') === undefined ? false : this.matOptionSet.get('onboard'), 
        refreshEmployees :  this.matOptionSet.get('refresh') === undefined ? false : this.matOptionSet.get('refresh') 
      });
    }
  }
  close(): void {
    this.dialogRef.close({ sendClicked: false });
  }
  downloadXlsx(): void {
    window.open('../../../assets/pdf/sample-employee-csv.xlsx');
  }

  selectionChange(event : any) : void{
    let selectedBoolean = this.matOptionSet.get(event.options[0]._value);
    this.matOptionSet.set(event.options[0]._value,!selectedBoolean);
  }
}
