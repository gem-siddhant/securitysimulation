import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/modules/main/service/main.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-campaign-confirm',
  templateUrl: './campaign-confirm.component.html',
  styleUrls: ['./campaign-confirm.component.css']
})
export class CampaignConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CampaignConfirmComponent>,private _mainService:MainService,private toastr:ToastrService,private _router: Router,
    private dialog:MatDialog,private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  endcamp()
  {
    
  }
    onClose() {
    this.dialogRef.close();
  } 
  close() {
      this.dialogRef.close();
      this.router.navigate(['main/campaign-view']);
  }  
}
