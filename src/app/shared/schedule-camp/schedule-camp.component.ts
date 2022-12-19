import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/modules/main/service/main.service';
import { CampaignConfirmComponent } from '../campaign-confirm/campaign-confirm.component';

import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { RescheduleComponent } from '../reschedule/reschedule.component';

@Component({
  selector: 'app-schedule-camp',
  templateUrl: './schedule-camp.component.html',
  styleUrls: ['./schedule-camp.component.css']
})
export class ScheduleCampComponent implements OnInit {

  StoreData:boolean=true;
  phisingForm:FormGroup;
  credsForm:FormGroup;
  campaigns:any=[];
  latest_Date:any;
  constructor(public dialogRef: MatDialogRef<ScheduleCampComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _main:MainService,
    private _schedule: MainService,
    private dialog:MatDialog,
    private router:Router,
    private formBuilder: FormBuilder,
    private sanitized: DomSanitizer,
    private toastr:ToastrService) { 
    this.phisingForm = this.formBuilder.group({});
    this.credsForm = this.formBuilder.group({});
    }

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    let reqbody = {
      'email': email
    }
    this._schedule.scheduled(reqbody).subscribe((data)=>{
      if(data){
        
        this.campaigns=data;
        for(let ele of this.campaigns)
        {
        }
      }
    },err=>{
      this.toastr.error("Error in loading data");
    })
  }
  deleteschedule(job:any)
  {
    const email = localStorage.getItem('email');
    let reqbody = {
      'email': email
    }

    let dataDialog = { title: 'Are you sure you want to delete this scheduled campaign?' };
    const dialogRef = this.dialog.open(CampaignConfirmComponent, {
      width: '513px',
      data: dataDialog
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log(result)
      if(result==true)
      {
    this._schedule.scheduled(reqbody).subscribe((data)=>{
      if(data){
        
        this.campaigns=data;
        for(let ele of this.campaigns)
        {
          const jobkey = ele.scheduledJobKey
          let key = (job)
          let reqbody2 = {
            'jobKey': key
          }
          this._schedule.deleteschedule(reqbody2).subscribe((data)=>{
            if (data)
            {
              let dataDialog = { title: 'Campaign ReScheduled Successfully!' };
              this.dialog.open(ConfirmationModalComponent, {
                width: '400px',
                height:'400px',
                data: dataDialog
              });
            }
          },
            (err)=>{
              this.StoreData=true;
               if(err.status==200){
                 console.log('err',err);
               let dataDialog = { title: 'Campaign deleted Successfully!' };
                const dialogRef = this.dialog.open(ConfirmationModalComponent, {
                  width: '400px',
                  height:'400px',
                  data: dataDialog
                });
                dialogRef.afterClosed().subscribe(()=>{
                  this.router.navigate(['main/dashboard']);
                })
              }
              else{
                
              }
            })
        }
  }
});
  }this.dialogRef.close(); })
}

Reschedule(job:any)
{
  const dialogRef = this.dialog.open(RescheduleComponent, {
    width: '750px',
    height: '300px', 
    });  
    localStorage.setItem('jobkey',job)
    this.dialogRef.close();
}
}





