import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { imgconst } from 'src/app/shared/Constants/constants';
import { RescheduleComponent } from 'src/app/shared/reschedule/reschedule.component';
import { SendCampaignModalComponent } from 'src/app/shared/send-campaign-modal/send-campaign-modal.component';
import { CampaignsService } from '../services/campaigns.service';
import { customValidator } from '../validation/custom.validation';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  templateId : Number;
  templateForm: FormGroup;
  shieldImg : String;
  constructor(
    private commonService : CommonService,
    private responsiveService : ResponsiveService,
    private formBuilder : FormBuilder,
    private router: ActivatedRoute,
    private dialog: MatDialog,
    private campaignService : CampaignsService,
    private toastr : ToastrService
  ) { 
    this.shieldImg = imgconst.shiledImg;
    this.templateId = 0;
    this.templateForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
    this.router.paramMap.pipe(take(1)).subscribe((params) =>{
      this.templateId = Number(params?.get("id"));
    })
    this.templateForm = this.formBuilder.group({
      templateType : [this.templateId],
      name : [""],
      description : [""],
      subject : [""],
      note : [""],
      rewardType : [""],
      rewardAmount : ['0'],
      emailSignature : [""],
      fileName : [""],
      fileContent : [""],
      sendAttachment : [false],
      allEmails : new FormArray([new FormGroup({
        senderEmail: new FormControl('', Validators.required),
      })]),
    });
    this.getPreFilledData(this.templateId);
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
        senderEmail: new FormControl('', customValidator('','email')),
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
  isEmailFieldInvalid(index: number) : boolean{
    let obj = (<FormGroup>((<FormArray>(this.templateForm.get('allEmails')))['controls'][index])).controls['senderEmail'].errors;
    return(obj !=null && obj['isInvalid']); 
  }
  emailFieldErrorMessage(index: number) : String{
    let obj = (<FormGroup>((<FormArray>(this.templateForm.get('allEmails')))['controls'][index])).controls['senderEmail'].errors;
    return obj['message']; 
  }

  sendCampaign(){
    console.log(this.templateForm.invalid);
    this.opneSendCampaignModal();
    if(!this.templateForm.invalid)
    {
    }

  }

  opneSendCampaignModal() : void{
    // const dialogRef = this.dialog.open(SendCampaignModalComponent, {
    //   width: '700px',
    // });
    const dialogRef = this.dialog.open(AlertModalComponent, {
      width: '454px',
    });
    
    dialogRef.afterClosed().subscribe({
      next : (data)=>{},
      error : (error)=>{this.toastr.error('Error while scheduling campaign')}
    })
  }

  scheduleCampaign() : void{
    const dialogRef = this.dialog.open(RescheduleComponent, {
      width: '700px',
    });
    
    dialogRef.afterClosed().subscribe({
      next : (data)=>{},
      error : (error)=>{this.toastr.error('Error while scheduling campaign')}
    })
  }

  getPreFilledData(id:Number) : void{
    this.campaignService.getPrefilled(id).pipe(take(1)).subscribe({
      next : (data)=>{
        if(data){
        this.templateForm = this.formBuilder.group({
          templateType : [this.templateId],
          name : [data.heading,[customValidator(data.heading,'campaign name')]],
          description : [data.description,[customValidator(data.description,'description')]],
          subject : [data.subject,[customValidator(data.subject,'subject')]],
          note : [data.addNote,[customValidator(data.addNote,'note')]],
          rewardType : [data.rewardType ? data.rewardType : '',[customValidator(data.rewardType,'reward type', this.templateId)]],
          rewardAmount : [data.amount ? data.amount : '0',[customValidator(data.amount,'reward amount', this.templateId)]],
          emailSignature : [data.emailSignature,[customValidator(data.emailSignature,'signature')]],
          fileName : [(this.templateId==1) ? "attachment" : ''],
          fileContent : [(this.templateId==1) ? "Please provide the content that you want in your custom file" : ''],
          sendAttachment : [(this.templateId==1) ? true : false],
          allEmails : new FormArray([new FormGroup({
            senderEmail: new FormControl('', customValidator('','email')),
          })]),
        });
      }
      },
      error : (error)=>{
        this.toastr.error("Error while loading data");
      }
    })
    this.changeAttachmentStatus();
  }

  changeAttachmentStatus(event? : MatRadioChange) : void{
    if((this.templateId === 1 && !event) || (event && event.value===true)){
      this.templateForm.get("fileName").setValidators([customValidator('', 'file name')]);
      this.templateForm.get("fileContent").setValidators([customValidator('', 'file content')]);
      this.templateForm.get("sendAttachment").setValue(true);
    }
    else{
      this.templateForm.get("fileName").clearValidators();
      this.templateForm.get("fileContent").clearValidators();
      this.templateForm.get("sendAttachment").setValue(false);
    }
  }

}
