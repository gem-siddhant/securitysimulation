import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/modules/main/service/main.service';

import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

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
          console.log(ele.taskId)
        }
        console.log(this.campaigns)

        //this.campaigns=data;
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
    this._schedule.scheduled(reqbody).subscribe((data)=>{
      if(data){
        
        this.campaigns=data;
        for(let ele of this.campaigns)
        {
          const jobkey = ele.scheduledJobKey
          console.log(ele.scheduledJobKey)
          let key = (job)
          let reqbody2 = {
            'jobKey': key
          }
          this._schedule.deleteschedule(reqbody2).subscribe((data)=>{
            if (data)
            {
              this.dialog.open(ConfirmationModalComponent, {
                width: '513px',
              });
            }
        })

        }
  }
},err=>{
  this.toastr.error("Error in loading data");
})

}
}





