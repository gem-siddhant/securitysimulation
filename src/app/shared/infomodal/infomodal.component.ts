import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-infomodal',
  templateUrl: './infomodal.component.html',
  styleUrls: ['./infomodal.component.css']
})
export class InfomodalComponent implements OnInit {
  DialogData:any;
  constructor(public dialogRef: MatDialogRef<InfomodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    onClose() {
      this.dialogRef.close();
    }  
  ngOnInit(): void {
  }

}
