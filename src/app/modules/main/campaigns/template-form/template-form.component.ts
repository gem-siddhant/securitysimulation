import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { RescheduleComponent } from 'src/app/shared/reschedule/reschedule.component';
import { SamplecsvComponent } from 'src/app/shared/samplecsv/samplecsv.component';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  templateId : Number;
  templateForm: FormGroup;
  constructor(
    private commonService : CommonService,
    private responsiveService : ResponsiveService,
    private formBuilder : FormBuilder,
    private router: ActivatedRoute,
    private dialog: MatDialog,
  ) { 
    this.templateId = 0;
    this.templateForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
    this.router.paramMap.pipe(take(1)).subscribe((params) =>{
      this.templateId = Number(params?.get("id"));
    })
    let emails = new FormArray([]);
    this.templateForm = this.formBuilder.group({
      templateType : [this.templateId],
      name : ["", Validators.required],
      description : ["", Validators.required],
      subject : ["", Validators.required],
      note : ["", Validators.required],
      rewardType : ["", Validators.required],
      rewardAmount : [0, Validators.required],
      emailSignature : ["", Validators.required],
      fileName : ["", Validators.required],
      fileContent : ["", Validators.required],
      sendAttachment : [false],
      allEmails : emails,
    });
    this.addEmailField();
  }

  addEmailField() : void {
    const emailpassItem = new FormGroup({
      senderEmail: new FormControl('', Validators.required),
    });
    (<FormArray>this.templateForm.get('allEmails')).push(emailpassItem);
  }

  getcontrols() : AbstractControl[]{
    return  (this.templateForm.get('allEmails') as FormArray).controls;
  }

  removeEmailField(index: number) : void {
    (<FormArray>this.templateForm.get('allEmails')).removeAt(index);
  }

  emailFieldOperation(index: number) : void{
    if(index === 0){
      const emailpassItem = new FormGroup({
        senderEmail: new FormControl('', Validators.required),
      });
      (<FormArray>this.templateForm.get('allEmails')).push(emailpassItem);
    }
    else{
      (<FormArray>this.templateForm.get('allEmails')).removeAt(index);
    }
  }
  isSdenAttachmentTrue() : boolean{
    return this.templateForm.value.sendAttachment;
  }
  isAmazonTemplateSelected() : boolean{
    return this.templateId === 1;
  }
  sendCampaign(){
    console.log(this.templateForm.value);

  }
  scheduleCampaign(){
    const dialogRef = this.dialog.open(RescheduleComponent, {
      width: '700px',
      });
  }

}
