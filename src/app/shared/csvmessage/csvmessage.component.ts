import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-csvmessage',
  templateUrl: './csvmessage.component.html',
  styleUrls: ['./csvmessage.component.css']
})
export class CsvmessageComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<CsvmessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
    onClose() {
      this.dialogRef.close();
    }  

  ngOnInit(): void {
  }

}
