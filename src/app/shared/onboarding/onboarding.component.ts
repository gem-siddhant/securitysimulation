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
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {
  StoreData:boolean=true;
  phisingForm:FormGroup;
  credsForm:FormGroup;
  constructor(public dialogRef: MatDialogRef<OnboardingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _main:MainService,
    private dialog:MatDialog,
    private router:Router,
    private formBuilder: FormBuilder,
    private sanitized: DomSanitizer,
    private toastr:ToastrService) { 
    this.phisingForm = this.formBuilder.group({});
    this.credsForm = this.formBuilder.group({});
    }

  ngOnInit(): void {
    this.phisingForm = this.formBuilder.group(
      {
        name:[''],
        email:['',Validators.email],
        jobdesc:['',Validators.required],
        purpose:['',Validators.required]
      }
    );
  }

  Onboard()
  {
    if(this.phisingForm.invalid)
    return;
    const formData :any= new FormData();
    
    let reqBody={
      'name':this.phisingForm.value.name,
      'email':this.phisingForm.value.email,
      'jobDescription':this.phisingForm.value.jobdesc,
      'purpose':this.phisingForm.value.purpose
    }
    let con = JSON.stringify(reqBody);
    formData.append("details",con);
    this._main.onboard(formData).subscribe((data)=>{
      if(data){
        this.StoreData=true;
        let dataDialog = { title: 'User Onboarding Request Sent!' };
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
          width: '600px',
          data: dataDialog
        });
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['main/login']);
        })
      }
    },(err)=>{
      this.StoreData=true;
       if(err.status==200){
         console.log('err',err);
       let dataDialog = { title: 'User Onboarding Request Sent!' };
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
          width: '600px',
          data: dataDialog
        });
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['main/login']);
        })
      }
      else{
        this.toastr.error("Error in adding campaign.");
      }
    });
    this.dialogRef.close();
  }
  
    

}
