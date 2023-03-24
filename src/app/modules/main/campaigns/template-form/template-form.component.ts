import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Observable, take } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { imgconst } from 'src/app/shared/Constants/constants';
import { SendCampaignModalComponent } from 'src/app/shared/send-campaign-modal/send-campaign-modal.component';
import { CampaignsService } from '../services/campaigns.service';
import { customValidator } from '../validation/custom.validation';
import { ScheduledModel, PreviewFormData, SendFormData, ScehduleFormData, CreateCampaignStatus } from './template-form.model';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  templateId : Number;
  templateForm: FormGroup;
  shieldImg : String;
  victimEmails : String[];
  scheduledData : ScheduledModel;
  constructor(
    private commonService : CommonService,
    private responsiveService : ResponsiveService,
    private formBuilder : FormBuilder,
    private router: ActivatedRoute,
    private route : Router,
    private dialog: MatDialog,
    private campaignService : CampaignsService,
    private toastr : ToastrService
  ) { 
    this.shieldImg = imgconst.shiledImg;
    this.templateId = 0;
    this.templateForm = this.formBuilder.group({});
    this.victimEmails = [] as String[];
    this.scheduledData = {} as ScheduledModel;
  }

  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
    this.commonService.setNavTitle('Create Campaign');
    this.commonService.setScreenRouting('/main/campaign/templates');
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
      rewardAmount : [''],
      emailSignature : [""],
      fileName : [""],
      fileContent : [""],
      urlTitle : [""],
      urlDescription : [""],
      sendAttachment : [true],
      sendUrlDetails : [false],
      allEmails : new FormArray([new FormGroup({
        senderEmail: new FormControl('', Validators.required),
      })]),
    });
    this.getPreFilledData(this.templateId);
    this.changeAttachmentStatus();
    this.changeUrlStatus();
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
        senderEmail: new FormControl('', customValidator('','sender email')),
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

  isSendUrlDetailsTrue() : boolean{
    return this.templateForm.value.sendUrlDetails;
  }

  isAmazonTemplateSelected() : boolean{
    return this.templateId === 1;
  }

  isITTemplateSelected() : boolean{
    return this.templateId === 5;
  }

  isEmailFieldInvalid(index: number) : boolean{
    let obj = (<FormGroup>((<FormArray>(this.templateForm.get('allEmails')))['controls'][index])).controls['senderEmail'].errors;
    return(obj !=null && obj['isInvalid']); 
  }

  emailFieldErrorMessage(index: number) : String{
    let obj = (<FormGroup>((<FormArray>(this.templateForm.get('allEmails')))['controls'][index])).controls['senderEmail'].errors;
    return obj['message']; 
  }

  openSendOrScheduleModal(btnTitle : string) : void{
    let dialogRef : MatDialogRef<SendCampaignModalComponent>;
    let alertTitle = '';
    dialogRef = this.dialog.open(SendCampaignModalComponent, {
      width: '759px',
      data: btnTitle
    });
    if(btnTitle === 'Send'){
      alertTitle = "Do you want to send this campaign?";
    }
    else{
      alertTitle = "Do you want to schedule this campaign?";
    }

    dialogRef.afterClosed().pipe(take(1)).subscribe({
      next : (dialogData)=>{
        if(dialogData &&  dialogData.sendClicked){
          this.victimEmails = dialogData.victimEmails;
          if(dialogData.scheduledData != null){
            this.scheduledData = dialogData.scheduledData;
          }
          this.openAlertModal(alertTitle, btnTitle);
        }
      },
      error : (error)=>{
        this.toastr.error(error)
      }
    })
  }

  openAlertModal(alertTitle : String, btnTitle : string) : void{
    const alertDialogRef = this.dialog.open(AlertModalComponent, {
      width: '454px',
      data :  alertTitle
    });
    alertDialogRef.afterClosed().pipe(take(1)).subscribe({
      next : (alertDialogData)=>{
        if(alertDialogData.yesClicked){
          
          this.sendOrScheduleCampaign(btnTitle);
        }
      },
    })
  }

  checkFormData(btnTitle : string) : void{
    if(!this.templateForm.invalid)
    {
      if(btnTitle === 'Preview'){
        this.sendOrScheduleCampaign(btnTitle);
      }
      else{
        this.openSendOrScheduleModal(btnTitle);
      }
    }
  }

  sendOrScheduleCampaign(btnTitle : string) : void{
    let sendDataFunction : Observable<CreateCampaignStatus | String>;
    const dispatchData = new FormData();
    const imagePath = "\dumyimg\click.png";
    const binaryImage = new File(["foo"], imagePath, {
      type: "file/png"
    });
    const email = this.templateForm.value.allEmails;
    let formData : ScehduleFormData | SendFormData | PreviewFormData;
    if(btnTitle === 'Send'){
      formData = {} as SendFormData
    }
    else if(btnTitle === 'Schedule'){
      formData = {} as ScehduleFormData;
    }
    else{
      formData = {} as PreviewFormData;
    }
    formData.addNote = this.templateForm.value.note;
    formData.attachmentName = this.templateForm.value.fileName;
    formData.createdBy = localStorage.getItem('email');
    formData.emailSignature = this.templateForm.value.emailSignature; 
    formData.name = this.templateForm.value.name;
    formData.sendAttachment = String(this.templateForm.value.sendAttachment); 
    formData.sendToReporters = 'false';
    formData.templateAmount = String(this.templateForm.value.rewardAmount);
    formData.templateDescription = this.templateForm.value.description;
    formData.templateHeading = this.templateForm.value.subject;
    formData.templateNo = String(this.templateForm.value.templateType);
    formData.templateRewardType = this.templateForm.value.rewardType;
    if(btnTitle === 'Preview'){
      (formData as PreviewFormData).attachmentText = this.templateForm.value.fileContent;
      (formData as PreviewFormData).email = email[0]['senderEmail'];
      
    }
    else if(btnTitle === 'Send'){
      (formData as SendFormData).victimEmails = this.victimEmails;
      (formData as SendFormData).senderCredentials = email;
      (formData as SendFormData).fileContent = this.templateForm.value.fileContent;
    }
    else if(btnTitle === 'Schedule'){
      (formData as ScehduleFormData).victimEmails = this.victimEmails;
      (formData as ScehduleFormData).senderCredentials = email;
      (formData as ScehduleFormData).fileContent = this.templateForm.value.fileContent;
      (formData as ScehduleFormData).scheduleDate = moment(this.scheduledData.date).format("YYYY-MM-DD");
      (formData as ScehduleFormData).scheduleTime = this.scheduledData.time;
      (formData as ScehduleFormData).scheduleTimeZone = this.scheduledData.timezone;
    }

    const stringifyFormData = JSON.stringify(formData);
    dispatchData.append('details',stringifyFormData);
    dispatchData.append('file',binaryImage)

    if(btnTitle === 'Schedule'){
      (sendDataFunction as Observable<String>) = this.campaignService.schedulecampagin(dispatchData);
    }
    else if(btnTitle === 'Send'){
      (sendDataFunction as Observable<CreateCampaignStatus>) = this.campaignService.createCampaign(dispatchData);
    }
    else{
      (sendDataFunction as Observable<String>) = this.campaignService.sendtome(formData as PreviewFormData);
    }

    sendDataFunction.pipe(take(1)).subscribe({
      next : (data) =>{
        this.opneConfirmationModal(btnTitle);
      },
      error : (error)=>{
        if(error.status !==200){
          this.toastr.error(error.error)
        }
        else{
          this.opneConfirmationModal(btnTitle);
        }
      }
    })
  }

  opneConfirmationModal(btnTitle : string) : void{
    let dialogTitle = "";
    if(btnTitle === 'Send'){
      dialogTitle = 'Campaign Sent Successfully!'
    }
    else if(btnTitle === 'Schedule'){
      dialogTitle = 'Campaign Scheduled Successfully!'
    }
    else{
      dialogTitle = 'Campaign Sent to you Successfully!'
    }
    let dataDialog = { title: dialogTitle};
    let dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '513px',
      data: dataDialog
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe({
      next: (data) => {
        if(btnTitle !== 'Preview')
          this.route.navigate(['/main/Admin']);      
      },
      error: (error) => {
        this.toastr.error(error);
      },
    });
  }

  getPreFilledData(id:Number) : void{
    this.campaignService.getPrefilled(id).pipe(take(1)).subscribe({
      next : (data)=>{
        if(data){
        this.templateForm = this.formBuilder.group({
          templateType : [this.templateId],
          name : [data.heading,[customValidator(data.heading,'campaign name')]],
          description : [data.description,[customValidator(data.description,'email body')]],
          subject : [data.subject,[customValidator(data.subject,'email subject')]],
          note : [data.addNote],
          rewardType : [data.rewardType ? data.rewardType : '',[customValidator(data.rewardType,'reward type', this.templateId)]],
          rewardAmount : [data.amount ? data.amount : '0',[customValidator(data.amount,'reward amount', this.templateId)]],
          emailSignature : [data.emailSignature,[customValidator(data.emailSignature,'email signature')]],
          urlTitle : [''],
          urlDescription : [''],
          fileName : ["attachment",[customValidator('', 'name of attachment')]],
          fileContent : ["Please provide the content that you want in your custom file",[customValidator('', 'content of attachment')]],
          sendAttachment : [true],
          sendUrlDetails : [false],
          allEmails : new FormArray([new FormGroup({
            senderEmail: new FormControl('', customValidator('','sender email')),
          })]),
        });
      }
      },
      error : (error)=>{
        this.toastr.error(error.error);
      }
    })
  }

  changeAttachmentStatus(event? : MatRadioChange) : void{
    if(!event || (event && event.value===true)){
      this.templateForm.get("fileName").setValidators([customValidator('', 'name of attachment')]);
      this.templateForm.get("fileContent").setValidators([customValidator('', 'content of attachment')]);
      this.templateForm.get("sendAttachment").setValue(true);
    }
    else{
      this.templateForm.get("fileName").clearValidators();
      this.templateForm.get("fileContent").clearValidators();
      this.templateForm.get("sendAttachment").setValue(false);
    }
    this.templateForm.get("fileName").updateValueAndValidity()
    this.templateForm.get("fileContent").updateValueAndValidity()
  }

  changeUrlStatus(event? : MatRadioChange) : void{
    if((event && event.value===true)){
      this.templateForm.get("urlTitle").setValidators([customValidator('', 'text before hyperlink')]);
      this.templateForm.get("urlDescription").setValidators([customValidator('', 'hyperlink text')]);
      this.templateForm.get("sendUrlDetails").setValue(true);
    }
    else{
      this.templateForm.get("urlTitle").clearValidators();
      this.templateForm.get("urlDescription").clearValidators();
      this.templateForm.get("sendUrlDetails").setValue(false);
    }
    this.templateForm.get("urlTitle").updateValueAndValidity()
    this.templateForm.get("urlDescription").updateValueAndValidity()
  }

}
