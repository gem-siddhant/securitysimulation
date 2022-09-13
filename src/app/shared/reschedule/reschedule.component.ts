import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { ToastrService } from 'ngx-toastr';
import { AddCampaignService } from 'src/app/modules/main/service/add-campaign.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.component.html',
  styleUrls: ['./reschedule.component.css']
})
export class RescheduleComponent implements OnInit {
  StoreData:boolean=true;
  DialogData:any;
  credsForm:FormGroup;
  phisingForm: FormGroup;
  api_hit:boolean=true;
  submitted = false;
  test: any = null;
  file: File = this.test;
  manager:any = "true";
  options:boolean=true;
  attachment:boolean=true;
  changeTriggered=false;
  constructor( public dialogRef: MatDialogRef<RescheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _addCampaign:AddCampaignService,
    private dialog:MatDialog,private router:Router,
    private formBuilder: FormBuilder,
    private sanitized: DomSanitizer,
    private toastr:ToastrService ){
      this.phisingForm = this.formBuilder.group({});
      this.credsForm = this.formBuilder.group({});
    }
  
  ngOnInit(): void {
    this.phisingForm = this.formBuilder.group(
      {
        date:['',Validators.required],
        time:['',Validators.required],
        tzone:['IST'],
      }
    );
  }

  onClose() {
    this.dialogRef.close();
  }  
  schedulelater(){
    console.log(localStorage.getItem('name'))
    console.log(localStorage.getItem('file'))
    //this.phisingForm.value.date =  new Date((this.phisingForm.value.dat).utcOffset('+0000').format('YYYY-MM-DD HH:MM'))
    this.submitted = true;
    const scheduledate = moment(this.phisingForm.value.date).format("YYYY-MM-DD");
    if(this.phisingForm.invalid)
    return;
    const formData :any= new FormData();
    let reqBody={
      'scheduleDate':scheduledate,
      'scheduleTime':this.phisingForm.value.time,
      'scheduleTimeZone':this.phisingForm.value.tzone,
      'jobKey':localStorage.getItem('jobkey')
    }
    console.log(this.phisingForm.value.tzone)
    let con = JSON.stringify(reqBody);
    formData.append("details",con);

    this.StoreData=false;
    this._addCampaign.reshedule(reqBody).subscribe((data)=>{
      if(data){
        this.StoreData=true;
        let dataDialog = { title: 'Campaign ReScheduled Successfully!' };
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
          width: '600px',
          data: dataDialog
        });
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['main/dashboard']);
        })
      }
    },(err)=>{
      this.StoreData=true;
       if(err.status==200){
         console.log('err',err);
       let dataDialog = { title: 'Campaign ReSchedule Successfully!' };
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
          width: '600px',
          data: dataDialog
        });
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['main/dashboard']);
        })
      }
      else{
        this.toastr.error("Error in adding campaign.");
      }
    });this.dialogRef.close();
  }
  moment(dat: any) {
    throw new Error('Method not implemented.');
  }
  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
        bodyBackgroundColor: '#66209D',
        buttonColor: '#fff'
    },
    dial: {
        dialBackgroundColor: '#66209D',
    },
    clockFace: {
        clockFaceBackgroundColor: '#fff',
        clockHandColor: '#312936;',
        clockFaceTimeInactiveColor: 'black'
    }
};


}