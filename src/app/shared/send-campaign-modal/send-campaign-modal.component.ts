import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { customValidator } from 'src/app/modules/main/campaigns/validation/custom.validation';
import { DownloadCsvModalComponent } from '../download-csv-modal/download-csv-modal.component';

@Component({
  selector: 'app-send-campaign-modal',
  templateUrl: './send-campaign-modal.component.html',
  styleUrls: ['./send-campaign-modal.component.css'],
})
export class SendCampaignModalComponent implements OnInit {
  sendCampaignForm: FormGroup;
  victimEmails : String[];
  isAttachmentInvalid : boolean;
  changeTriggered : boolean;
  csvError : String;
  submitted : boolean;
  selected : String;
  currentdate :Date
  maxDate: Date;
  typeOfCampaign : String;
  constructor(
    private dialogRef: MatDialogRef<SendCampaignModalComponent>,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: String,
  ) {
    this.sendCampaignForm = this.formBuilder.group({});
    this.victimEmails = [] as String[];
    this.changeTriggered = false;
    this.csvError = 'Please upload csv file';
    this.submitted = false;
    this.currentdate = new Date();
    this.selected = 'None';
    this.maxDate = new Date((new Date()).getFullYear() + 1, 2);
    this.typeOfCampaign = this.data;
  }

  ngOnInit(): void {
    this.sendCampaignForm = this.formBuilder.group({
      date:['',[customValidator('', 'date')]],
      time:['',[customValidator('', 'time')]],
      timezone:['',[customValidator('', 'time zone')]],
      attachmentFile : ['']
    })
    this.setValidations();
  }

  setValidations() : void{
    if(this.isCampaignTypeSchedule()){
      this.sendCampaignForm.get("date").setValidators([customValidator('', 'date')]);
      this.sendCampaignForm.get("time").setValidators([customValidator('', 'time')]);
      this.sendCampaignForm.get("timezone").setValidators([customValidator('', 'time zone')]);
    }
    else{
      this.sendCampaignForm.get("date").clearValidators();
      this.sendCampaignForm.get("time").clearValidators();
      this.sendCampaignForm.get("timezone").clearValidators();
    }
    this.sendCampaignForm.get("date").updateValueAndValidity();
    this.sendCampaignForm.get("time").updateValueAndValidity();
    this.sendCampaignForm.get("attachmentFile").updateValueAndValidity();  
  }

  isCampaignTypeSchedule() : boolean{
    return this.typeOfCampaign === 'Schedule';
  }


  samplecsv(): void {
    window.open('../../../assets/pdf/samplefile.csv');
    // let dataDialog = { title: 'CSV file not Provided' };
    // this.dialog.open(DownloadCsvModalComponent, {
    //   width: '700px',
    //   data: dataDialog,
    // });
  }

  onChange(event: any) {
    this.victimEmails = [];
    this.csvError = '';
    this.changeTriggered = true;
    const reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    reader.onload = () => {
      let text: String = String(reader.result);
      let lines = text.split('\n');
      let format = /[ `!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;

      for (var i = 0; i < lines.length; i++) {
        let email = lines[i].replace('\r', '');
        if (
          email != '' &&
          email.includes('@') == true &&
          email.split('@').length - 1 == 1 &&
          format.test(email) == false &&
          (email.endsWith('geminisolutions.com') ||
            email.endsWith('Geminisolutions.com'))
        ) {
          this.csvError = '';
          this.victimEmails.push(email);
        } else {
          this.csvError = `Format of ${email} is invalid`;
          this.victimEmails = [];
          return;
        }
      }
    };
  }
  @ViewChild('timePicker') timePicker: any;
  openFromIcon(timePicker: { open: () => void }) {
    timePicker.open();
  }

  dispatchCampaign(): void {
    this.submitted = true;
    if(!this.sendCampaignForm.invalid && this.changeTriggered && this.csvError === ''){
      this.dialogRef.close({sendClicked : true, victimEmails : this.victimEmails, scheduledData : this.typeOfCampaign === 'send' ? null : this.sendCampaignForm.value});
    }
  }

  close() : void{
    this.dialogRef.close({sendClicked : false});
  }

  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
        bodyBackgroundColor: '#38A3A5',
        buttonColor: '#fff'
    },
    dial: {
        dialBackgroundColor: '#38A3A5',
    },
    clockFace: {
        clockFaceBackgroundColor: '#fff',
        clockHandColor: '#38A3A5;',
        clockFaceTimeInactiveColor: 'black'
    }
  }
}
