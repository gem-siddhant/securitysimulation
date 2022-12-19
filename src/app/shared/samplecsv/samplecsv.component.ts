import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-samplecsv',
  templateUrl: './samplecsv.component.html',
  styleUrls: ['./samplecsv.component.css']
})
export class SamplecsvComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<SamplecsvComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
    onClose() {
      this.dialogRef.close();
    }  
  ngOnInit(): void {
  }

}
