import { Component, ElementRef, EventEmitter, OnInit, Output, Pipe, PipeTransform, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
  NgForm,
} from "@angular/forms";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDatepickerToggle } from '@angular/material/datepicker';
import { HttpClient } from '@angular/common/http';
import { ThemePalette } from '@angular/material/core';
import { AddCampaignService } from '../service/add-campaign.service';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { DialogRole, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';
import { SELECT_PANEL_INDENT_PADDING_X } from '@angular/material/select/select';
import { config, delay } from 'rxjs';
import { ExitStatus } from 'typescript';
import { MatRadioButton } from '@angular/material/radio';
import { PasswordGrantConstants } from '@azure/msal-common/dist/utils/Constants';
import { JsonPipe } from '@angular/common';
import { add } from './add-camp.model';
import { Papa } from 'ngx-papaparse';
import { SendcampaignComponent } from '../sendcampaign/sendcampaign.component';
import { SchedulelaterComponent } from '../schedulelater/schedulelater.component';
import { CampaignConfirmComponent } from 'src/app/shared/campaign-confirm/campaign-confirm.component';

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value:any) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.css'],
})

export class AddCampaignComponent implements OnInit {
  StoreData:boolean=true;
phisingForm:FormGroup;
credsForm:FormGroup;
test: any = null;
file: File = this.test;
submitted=false;
response:any;
color: ThemePalette = 'primary';
value = 50;
api_hit=false;
mode: ProgressSpinnerMode = 'indeterminate';
changeTriggered=false;
prefilled:any={heading:'',amount:'',rewardType:'',subject:'',description:'',addNote:'',emailSignature:''};
testhtml:any='';
options:boolean=true;
attachment:boolean=true;
attachment1:boolean=false;
//manager:any = "true";
i:any=1;
selectedOption: any = [];
addresses: any = [{
  email: '',
  password: ''
}];
manager:any = localStorage.getItem('Manager');
@Output() close: EventEmitter<any> = new EventEmitter();
testFINAL=this.sanitized.bypassSecurityTrustHtml(this.testhtml)
  constructor(
    private _addCampaign:AddCampaignService,
    private papa: Papa,
     private formBuilder: FormBuilder,
     private dialog:MatDialog,private router:Router,
     private sanitized: DomSanitizer,
     private toastr:ToastrService) {
    this.phisingForm = this.formBuilder.group({});
    this.credsForm = this.formBuilder.group({});

  }

  ngOnInit(): void {
  let emailpass = new FormArray([]);
  this.phisingForm = this.formBuilder.group({
  name:['',Validators.required],
  reward_type:[''],
  desc:['',Validators.required],
  reward_amount:[''],
  tempate_select:['',],
  subject:['',Validators.required],
  addnote:[''],
  footer:['',Validators.required],
  radio2:[''||'false'],
  fileattach:[''||'attachment'],
  date:[''],
  time:[''],
  filecontent:[''||'Please provide the content that you want in your custom file'],
  allemails : emailpass
});
  this.addAddress();
  }

  addAddress() {
    const emailpassItem = new FormGroup({
      senderEmail: new FormControl('', Validators.required),
    });
   
    
    (<FormArray>this.phisingForm.get('allemails')).push(emailpassItem);
  }
  getcontrols()
  {
    return (this.phisingForm.get('allemails') as FormArray).controls;

  }
  cleartext()
  {
    this.phisingForm.value.allemails.onreset();
  }
  onRemoveQuestion(index: number) {
    const emailpassItem = new FormGroup({
      senderEmail: new FormControl('', Validators.email),
    });
    (<FormArray>this.phisingForm.get('allemails')).removeAt(index);
    this.selectedOption.splice(index, 1);
  }
  
  onChange(event: any) {
    this.changeTriggered = true;
    this.file = event.target.files[0];
    let csvToJson = require('convert-csv-to-json');
    let json = csvToJson.getJsonFromCsv(this.file);
    for(let i=0; i<json.length;i++){
        console.log(json[i]);
    }
  }
  getPreFilledData(id:any){
    this.i++
    if(this.i>=3)
    {
      this.phisingForm.reset()
      this.phisingForm.value.radio2 = true
    }
    this._addCampaign.getPrefilled(id).subscribe((data)=>{
      this.prefilled=data;
      if(this.prefilled.heading)
      {
        this.phisingForm.value.name = this.prefilled.heading;
      }
      if(this.prefilled.subject){
        this.phisingForm.value.subject=this.prefilled.subject;

      }
      if(this.prefilled.rewardType){
        this.phisingForm.value.reward_type=this.prefilled.rewardType;
      }

      if(this.prefilled.description){
        this.phisingForm.value.desc=this.prefilled.description;

      }

      if(this.prefilled.addNote){
        this.phisingForm.value.addnote=this.prefilled.addNote;
      }

      if(this.prefilled.emailSignature){
        this.phisingForm.value.footer=this.prefilled.emailSignature;
      }

      if(this.prefilled.amount){
        this.phisingForm.value.amount=this.prefilled.amount;
      }
    })

  }

  schedulelater()
  {
    for(let i=0;i<this.phisingForm.value.allemails.length;i++)
    {
      let email = this.phisingForm.value.allemails[i];
      console.log(email['senderEmail'])
      if(email['senderEmail'].includes(['@']) && email['senderEmail'].includes(['.']))
      {
      }
      else{
        this.toastr.error("not a valid email to send campaigns")
        return
      }
    }
    let email = this.phisingForm.value.allemails[0];
    if(this.phisingForm.value.name == "" || this.phisingForm.value.subject == "" || this.phisingForm.value.desc == ""|| this.phisingForm.value.footer == "")
    {
      this.toastr.error("Please EDIT The Fields")
      return;
    }
    if(email['senderEmail']=="" )
    {
      this.toastr.error("Please Provide email")
      return;
    }
    const dialogRef = this.dialog.open(SchedulelaterComponent, {
      width: '770px',
      height: '330px',
    }); 

    localStorage.setItem('name',this.phisingForm.value.name);
    localStorage.setItem('templateRewardType',this.phisingForm.value.reward_type);
    localStorage.setItem('templateDescription',this.phisingForm.value.desc);
    localStorage.setItem('templateAmount',this.phisingForm.value.reward_amount);
    localStorage.setItem('templateNo',this.phisingForm.value.tempate_select);
    localStorage.setItem('templateHeading',this.phisingForm.value.subject);
    localStorage.setItem('email1',this.phisingForm.value.email);
    localStorage.setItem('sendToReporters', this.phisingForm.value.radio);
    localStorage.setItem('addNote',this.phisingForm.value.addnote);
    localStorage.setItem('emailSignature',this.phisingForm.value.footer);
    localStorage.setItem('sendAttachment',this.phisingForm.value.radio2);
    localStorage.setItem('attachmentName',this.phisingForm.value.fileattach);
    localStorage.setItem('fileContent',this.phisingForm.value.filecontent);
    localStorage.setItem("users", JSON.stringify(this.phisingForm.value.allemails));
  }
 
  sendcampaign()
  {
    for(let i=0;i<this.phisingForm.value.allemails.length;i++)
    {
      let email = this.phisingForm.value.allemails[i];
      console.log(email['senderEmail'])
      if(email['senderEmail'].includes(['@']) && email['senderEmail'].includes(['.']))
      {
      }
      else{
        this.toastr.error("not a valid email to send campaigns")
        return
      }
    }
    let email = this.phisingForm.value.allemails[0];
    if(this.phisingForm.value.name == "" || this.phisingForm.value.subject == "" || this.phisingForm.value.desc == ""|| this.phisingForm.value.footer == "")
    {
      this.toastr.error("Please EDIT The Fields")
      return;
    }
    if(email['senderEmail']=="" )
    {    
      this.toastr.error("Please Provide email")
      return;
    }
    const dialogRef = this.dialog.open(SendcampaignComponent, {
      width: '523px',
      height: '330px',
  });
    localStorage.setItem('name',this.phisingForm.value.name);
    localStorage.setItem('templateRewardType',this.phisingForm.value.reward_type);
    localStorage.setItem('templateDescription',this.phisingForm.value.desc);
    localStorage.setItem('templateAmount',this.phisingForm.value.reward_amount);
    localStorage.setItem('templateNo',this.phisingForm.value.tempate_select);
    localStorage.setItem('templateHeading',this.phisingForm.value.subject);
    localStorage.setItem('email1',this.phisingForm.value.email);
    localStorage.setItem('sendToReporters', this.phisingForm.value.radio);
    localStorage.setItem('addNote',this.phisingForm.value.addnote);
    localStorage.setItem('emailSignature',this.phisingForm.value.footer);
    localStorage.setItem('sendAttachment',this.phisingForm.value.radio2);
    localStorage.setItem('attachmentName',this.phisingForm.value.fileattach);
    localStorage.setItem('fileContent',this.phisingForm.value.filecontent); 
    localStorage.setItem("users", JSON.stringify(this.phisingForm.value.allemails));
}

  submit(){
    let email = this.phisingForm.value.allemails[0];
    console.log(email['senderEmail'])
    if(email['senderEmail'].includes(['@']) && email['senderEmail'].includes(['.']))
      {
      }
    else{
      this.toastr.error("not a valid email to send campaigns")
      return
      }
    this.submitted=true;
    if (this.phisingForm.value.name == "")
    {
      this.toastr.error("Please EDIT the name of campaign");
    }
    if (this.phisingForm.value.subject == "")
    {
      this.toastr.error("Please EDIT the Subject")
    }
    if (this.phisingForm.value.desc == "")
    {
      this.toastr.error("Please EDIT the description")
    }
    if (this.phisingForm.value.footer == "")
    {
      this.toastr.error("Please EDIT the Email Signature")
    }
    if(this.phisingForm.invalid)
    return;
    const tempno = JSON.stringify(this.phisingForm.value.tempate_select)
    const sendattach = JSON.stringify(this.phisingForm.value.radio2)
    const formData :any= new FormData();
    let reqBody={
      'name':this.phisingForm.value.name,
      'templateDescription':this.phisingForm.value.desc,
      'templateAmount':this.phisingForm.value.reward_amount.toString(),
      'templateNo':tempno,
      'templateRewardType':this.phisingForm.value.reward_type,
      'templateHeading':this.phisingForm.value.subject,
      'createdBy':localStorage.getItem('email'),
      'email': email['senderEmail'],
      'sendToReporters' : this.phisingForm.value.radio,
      'addNote' : this.phisingForm.value.addnote,
      'emailSignature': this.phisingForm.value.footer,
      'sendAttachment': sendattach,
      'attachmentName': this.phisingForm.value.fileattach,
      'attachmentText':this.phisingForm.value.filecontent,
    }
    let con = JSON.stringify(reqBody);
    formData.append("details",con);
    formData.append("allemails",this.phisingForm.value.allemails)
    this.StoreData=false;
    this._addCampaign.sendtome(reqBody).subscribe((data)=>{
      if(data){
        this.StoreData=true;
        let dataDialog = { title: 'Campaign Created Successfully!' };
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
          width: '513px',
          data: dataDialog
        });
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['main/add-campaign']);
        })
      }
    },(err)=>{
      this.StoreData=true;
       if(err.status==200){
         console.log('err',err);
       let dataDialog = { title: 'Campaign Sent to you Successfully!' };
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
          width: '513px',
          data: dataDialog
        });
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['main/add-campaign']);
        })
      }
      else{
        this.toastr.error("Error in adding campaign.");
      }
    });
  }
}
function email(email: any) {
  throw new Error('Function not implemented.');
}

