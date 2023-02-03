import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { blob } from 'stream/consumers';
import { DownloadCsvModalComponent } from '../download-csv-modal/download-csv-modal.component';
import { SamplecsvComponent } from '../samplecsv/samplecsv.component';

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
  constructor(
    public dialogRef: MatDialogRef<SendCampaignModalComponent>,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.sendCampaignForm = this.formBuilder.group({});
    this.victimEmails = [] as String[];
    this.changeTriggered = false;
  }

  ngOnInit(): void {
    this.sendCampaignForm = this.formBuilder.group({
      attachmentFile: [''],
    });
  }

  samplecsv(): void {
    let dataDialog = { title: 'CSV file not Provided' };
    this.dialog.open(DownloadCsvModalComponent, {
      width: '700px',
      data: dataDialog,
    });
  }

  onChange(event: any) {
    this.victimEmails = [];
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
          this.victimEmails.push(email);
        } else {
          console.log('Invalid email format')
          this.victimEmails = [];
        }
      }
    };
  }

  sendCampaign(): void {}
}
