import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Observable, take } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { RescheduleComponent } from 'src/app/shared/reschedule/reschedule.component';
import { SendCampaignModalComponent } from 'src/app/shared/send-campaign-modal/send-campaign-modal.component';
import { CampaignsService } from '../services/campaigns.service';
import { CreateCampaignStatus, PreviewFormData, ScehduleFormData, ScheduledModel, SendFormData } from '../template-form/template-form.model';
import { customValidator } from '../validation/custom.validation';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.css']
})
export class CustomFormComponent implements OnInit {

  templateId : Number;
  templateForm: FormGroup;
  screenSize : String;
  uploadedImage : SafeUrl;
  changeTrigger : boolean;
  imgSource : ArrayBuffer | string;
  victimEmails : String[];
  scheduledData : ScheduledModel;
  imageFile : File
  constructor(
    private commonService : CommonService,
    private responsiveService : ResponsiveService,
    private formBuilder : FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private dialog: MatDialog,
    private sanitizer : DomSanitizer,
    private toastr : ToastrService,
    private campaignService : CampaignsService
  ) { 
    this.templateId = 4;
    this.templateForm = this.formBuilder.group({});
    this.uploadedImage = '';
    this.changeTrigger = false;
    this.imgSource = '';
    this.victimEmails = [] as String[];
    this.scheduledData = {} as ScheduledModel;
  }

  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
    this.screenSize = 'lg';
    this.router.paramMap.pipe(take(1)).subscribe((params) =>{
      this.templateId = Number(params?.get("id"));
    })
    let emails = new FormArray([]);
    this.templateForm = this.formBuilder.group({
      name : ["", customValidator('','campaign name')],
      description : ["", customValidator('','email description')],
      subject : ["", customValidator('','email subject')],
      note : ["", customValidator('','add note')],
      emailSignature : ["", customValidator('','email signature')],
      addDescription : [false],
      allEmails : emails,
    });
    this.addEmailField();
    this.onChangeAddDescription();
    this.checkScreenStatus();
    this.onResize();
  }

  onChangeAddDescription(event? : MatRadioChange) : void{
    if(!event || (event && event.value===false)){
      this.templateForm.get("description").clearValidators();
      this.templateForm.get("note").clearValidators();
      this.templateForm.get("addDescription").setValue(false);
    }
    else{
      this.templateForm.get("description").setValidators([customValidator('', 'email description')]);
      this.templateForm.get("note").setValidators([customValidator('', 'add note')]);
      this.templateForm.get("addDescription").setValue(true);
    }
    this.templateForm.get("description").updateValueAndValidity();
    this.templateForm.get("note").updateValueAndValidity();
    this.templateForm.get("addDescription").updateValueAndValidity();
  }

  checkScreenStatus() : void {
    this.responsiveService.getScreenStatus().subscribe((screenSize : String) => {
      if (screenSize) {
        this.screenSize=screenSize;
      }
    });
  }

  isScreenSizeMd() : boolean{
    return this.screenSize === 'md';
  }
  
  isScreenMobile() : boolean{
    return this.screenSize !== 'lg';
  }

  onChange(event : any) : void{
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      this.changeTrigger = true;
      this.imageFile = event.target.files[0];
      if(this.imageFile.size > (2*1024*1024))
        return;
      else
        this.changeTrigger = false;
      reader.readAsDataURL(this.imageFile);
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs : any) => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          console.log(img_height, img_width);
          if(img_height> 300){

          }
          if(img_width >300){
            
          }
        };
        
        this.uploadedImage = this.sanitizer.bypassSecurityTrustUrl(String(reader.result));
        this.imgSource = e.target.result;
        console.log(this.imgSource);
      };
    }
  }

  onResize() : void{
    this.responsiveService.checkWidth();
  }

  addEmailField() : void {
    const emailpassItem = new FormGroup({
      senderEmail: new FormControl('', customValidator('','email')),
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

  isAddDescriptionTrue() : boolean{
    return this.templateForm.value.addDescription;
  }

  isEmailFieldInvalid(index: number) : boolean{
    let obj = (<FormGroup>((<FormArray>(this.templateForm.get('allEmails')))['controls'][index])).controls['senderEmail'].errors;
    return(obj !=null && obj['isInvalid']); 
  }

  emailFieldErrorMessage(index: number) : String{
    let obj = (<FormGroup>((<FormArray>(this.templateForm.get('allEmails')))['controls'][index])).controls['senderEmail'].errors;
    return obj['message']; 
  }

  checkFormData(btnTitle : String) : void{
    if(!this.templateForm.invalid)
    {
      this.openSendOrScheduleModal(btnTitle);
    }
  }

  sendOrScheduleCampaign(btnTitle : String) : void{
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
    formData.createdBy = localStorage.getItem('email');
    formData.emailSignature = this.templateForm.value.emailSignature; 
    formData.name = this.templateForm.value.name;
    formData.sendToReporters = 'false';
    formData.templateDescription = this.templateForm.value.description;
    formData.templateHeading = this.templateForm.value.subject;
    formData.templateNo = '6';
    formData.sendAttachment = 'false';
    if(btnTitle === 'Preview'){
      (formData as PreviewFormData).email = email[0]['senderEmail'];
      
    }
    else if(btnTitle === 'Send'){
      (formData as SendFormData).victimEmails = this.victimEmails;
      (formData as SendFormData).senderCredentials = email;
    }
    else if(btnTitle === 'Schedule'){
      (formData as ScehduleFormData).victimEmails = this.victimEmails;
      (formData as ScehduleFormData).senderCredentials = email;
      (formData as ScehduleFormData).scheduleDate = moment(this.scheduledData.date).format("YYYY-MM-DD");
      (formData as ScehduleFormData).scheduleTime = this.scheduledData.time;
      (formData as ScehduleFormData).scheduleTimeZone = this.scheduledData.timezone;
    }

    const stringifyFormData = JSON.stringify(formData);
    dispatchData.append('details',stringifyFormData);

    if(this.uploadedImage !=null && this.uploadedImage !==''){
      dispatchData.append('file',this.imageFile)
    }
    else{
      dispatchData.append('file',binaryImage)
    }
    

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
        this.opneConfirmationModal();
      },
      error : (error)=>{
        if(error.status !==200){
          this.toastr.error('Error while sending campaign')
        }
        else{
          this.opneConfirmationModal();
        }
      }
    })
  }

  openSendOrScheduleModal(btnTitle : String) : void{
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
        if(dialogData && dialogData.sendClicked){
          this.victimEmails = dialogData.victimEmails;
          if(dialogData.scheduledData != null){
            this.scheduledData = dialogData.scheduledData;
          }
          this.openAlertModal(alertTitle, btnTitle);
        }
      },
      error : (error)=>{
        this.toastr.error('Error while sending campaign')
      }
    })
  }
  
  openAlertModal(alertTitle : String, btnTitle : String) : void{
    const alertDialogRef = this.dialog.open(AlertModalComponent, {
      width: '454px',
      data :  alertTitle
    });
    alertDialogRef.afterClosed().pipe(take(1)).subscribe({
      next : (alertDialogData)=>{
        if(alertDialogData.yesClicked){
          
          this.sendOrScheduleCampaign(btnTitle);
          console.log(this.templateForm.value);
          console.log(this.victimEmails);
          console.log(this.scheduledData);
        }
      },
    })
  }

  opneConfirmationModal() : void{
    let dataDialog = { title: 'Campaign Sent Successfully!' };
    let dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '513px',
      data: dataDialog
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe({
      next: (data) => {
        this.route.navigate(['/main/Admin']);      
      },
      error: (error) => {
        this.toastr.error('Error while closing modal');
      },
    });
  } 
}
