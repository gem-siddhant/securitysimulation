import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {

  alertText : String;
  constructor(private dialogRef: MatDialogRef<AlertModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { 
      this.alertText = this.data;
    }

  ngOnInit(): void {
  }

  closeModal(value : boolean){
    this.dialogRef.close({yesClicked : value});
  }

}
