import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/modules/main/service/main.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-reconfirm-modal',
  templateUrl: './reconfirm-modal.component.html',
  styleUrls: ['./reconfirm-modal.component.css']
})
export class ReconfirmModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ReconfirmModalComponent>,
    private _mainService:MainService,private toastr:ToastrService,private _router: Router,
    private dialog:MatDialog,private router:Router) { }

  ngOnInit(): void {
  }
  endcamp()
  {
    let id: any = Number;
    id = localStorage.getItem('ID')
    this.dialogRef.close();
    this._mainService.endcampaign(id).subscribe((data)=>{
      if(data)
      {
        localStorage.setItem("Campstatus",data.status)
        let dataDialog = { title: 'Campaign Ended Successfully!' };
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
          width: '400px',
          height:'400px',
          data: dataDialog
        });
  
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['main/campaign-view']);
          window.location.reload()
        })
        
      }
    })
  }
  close() {
      this.dialogRef.close();
      this.router.navigate(['main/campaign-view']);
  }  
}
