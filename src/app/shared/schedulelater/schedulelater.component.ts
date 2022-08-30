import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  selector: 'app-schedulelater',
  templateUrl: './schedulelater.component.html',
  styleUrls: ['./schedulelater.component.css']
})
export class SchedulelaterComponent implements OnInit {
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
  constructor( public dialogRef: MatDialogRef<SchedulelaterComponent>,
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
        date:[''],
        time:[''],
        tzone:['IST'],
        attachmentFile:[''],
        radio:[''||'false'],
      }
    );
  }
  onChange(event: any) {
    this.changeTriggered = true;
    this.file = event.target.files[0];
    
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
      'name': localStorage.getItem('name'),
      'templateDescription':localStorage.getItem('templateDescription'),
      'templateAmount':localStorage.getItem('templateAmount'),
      'templateNo':localStorage.getItem('templateNo'),
      'templateRewardType':localStorage.getItem('templateRewardType'),
      'templateHeading':localStorage.getItem('templateHeading'),
      'createdBy':localStorage.getItem('email'),
      'email':localStorage.getItem('email1'),
      'password':localStorage.getItem('password'),
      'sendToReporters' : localStorage.getItem('sendToReporters'),
      'addNote' : localStorage.getItem('addNote'),
      'emailSignature': localStorage.getItem('emailSignature'),
      'sendAttachment': localStorage.getItem('sendAttachment'),
      'attachmentName': localStorage.getItem('attachmentName'),
      'fileContent':localStorage.getItem('fileContent'),
      'scheduleDate':scheduledate,
      'scheduleTime':this.phisingForm.value.time,
      'scheduleTimeZone':this.phisingForm.value.tzone,
    }
    console.log(this.phisingForm.value.tzone)
    let con = JSON.stringify(reqBody);
    formData.append("details",con);
    if(this.manager=='true')
    {
    const localfile = "../../../../assets/pdf/fallbackcsv.csv"
    var local = new File(["foo"], localfile, {
      type: "file/csv"
    });
      if(this.file!=null && this.file.size==0)
      {
        this.toastr.error("empty csv can not be uploaded");
       
      }
      else if(this.phisingForm.value.radio==true){
        
        formData.append("file",local);
      }
      else{
        formData.append("file",this.file)
      }
    }
    else
    {
      if(this.file.size == 0)
      {

        this.toastr.error("empty csv can not be uploaded");
      }
      else{
      formData.append("file",this.file);
      }
    }


    this.StoreData=false;
    this._addCampaign.schedulecampagin(formData).subscribe((data)=>{
      if(data){
        this.StoreData=true;
        let dataDialog = { title: 'Campaign Schedule Successfully!' };
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
       let dataDialog = { title: 'Campaign Schedule Successfully!' };
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
