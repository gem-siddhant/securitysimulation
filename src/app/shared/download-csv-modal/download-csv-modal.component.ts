import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-download-csv-modal',
  templateUrl: './download-csv-modal.component.html',
  styleUrls: ['./download-csv-modal.component.css']
})
export class DownloadCsvModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DownloadCsvModalComponent>) { }

  ngOnInit(): void {
  }
  onClose() : void{
    this.dialogRef.close();
  }
  downloadCsv() : void{
    window.open('../../../assets/pdf/samplefile.csv');
  }

}
