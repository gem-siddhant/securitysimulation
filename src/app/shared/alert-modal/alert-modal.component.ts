import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AlertModalComponent>,) { }

  ngOnInit(): void {
  }

  closeModal(value : boolean){
    this.dialogRef.close({yesClicked : value});
  }

}
