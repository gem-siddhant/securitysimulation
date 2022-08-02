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
import { DialogRole, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';
import { SELECT_PANEL_INDENT_PADDING_X } from '@angular/material/select/select';
import { delay } from 'rxjs';
import { ExitStatus } from 'typescript';
import { MatRadioButton } from '@angular/material/radio';
import { PasswordGrantConstants } from '@azure/msal-common/dist/utils/Constants';

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
//manager:any = "true";
manager:any = localStorage.getItem('Manager');
@Output() close: EventEmitter<any> = new EventEmitter();
testFINAL=this.sanitized.bypassSecurityTrustHtml(this.testhtml)
  constructor(private _addCampaign:AddCampaignService,
     private formBuilder: FormBuilder,
     private dialog:MatDialog,private router:Router,
     private sanitized: DomSanitizer,
     private toastr:ToastrService) {
    this.phisingForm = this.formBuilder.group({});
    this.credsForm = this.formBuilder.group({});

  }

  ngOnInit(): void {
  this.phisingForm = this.formBuilder.group({
  name:['',Validators.required],
  reward_type:[''],
  desc:['',Validators.required],
  reward_amount:[''],
  tempate_select:[0,Validators.required],
  attachmentFile:[''],
  subject:['',Validators.required],
  email:['',Validators.required],
  password:['',Validators.required],
  radio:[''||'false'],
  addnote:['',Validators.required],
  footer:['',Validators.required],
  radio2:[''||'false'],
  fileattach:[''||'attachment.pdf']
});
  }
  
  onChange(event: any) {
    this.changeTriggered = true;
    this.file = event.target.files[0];
    
  }
  getPreFilledData(id:any){
    this._addCampaign.getPrefilled(id).subscribe((data)=>{
      console.log('data',data.subject)
      console.log(this.phisingForm.value.radio)
      this.prefilled=data;
      console.log(this.prefilled)

      if(this.prefilled.heading)
      {
        this.toastr.error("please edit the fields before creating campaign")
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
    console.log(this.phisingForm.value.footer)
    console.log( this.phisingForm.value.addnote)
  }
 
  submitForm(){

    console.log(this.file);
    this.submitted=true;
    if(this.phisingForm.invalid)
    return;
    console.log('FORM',this.phisingForm.value);
    const formData :any= new FormData();
    let reqBody={
      'name':this.phisingForm.value.name,
      'templateDescription':this.phisingForm.value.desc,
      'templateAmount':this.phisingForm.value.reward_amount.toString(),
      'templateNo':this.phisingForm.value.tempate_select,
      'templateRewardType':this.phisingForm.value.reward_type,
      'templateHeading':this.phisingForm.value.subject,
      'createdBy':localStorage.getItem('email'),
      'email':this.phisingForm.value.email,
      'password':this.phisingForm.value.password,
      'sendToReporters' : this.phisingForm.value.radio,
      'addNote' : this.phisingForm.value.addnote,
      'emailSignature': this.phisingForm.value.footer,
      'sendAttachment': this.phisingForm.value.radio2,
      'attachmentName': this.phisingForm.value.fileattach
    }
    console.log('FORM',reqBody);
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
        //formData.append("file",this.file);
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
        console.log(this.file.size)
        this.toastr.error("empty csv can not be uploaded");
      }
      else{
      formData.append("file",this.file);
      }
    }

    this.StoreData=false;
    this._addCampaign.createCampaign(formData).subscribe((data)=>{
      if(data){
        this.StoreData=true;
        let dataDialog = { title: 'Campaign Created Successfully!' };
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
          width: '513px',
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
       let dataDialog = { title: 'Campaign Created Successfully!' };
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
          width: '513px',
          data: dataDialog
        });
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['main/dashboard']);
        })
      }
      else{
        this.toastr.error("Error in adding campaign.");
      }
    });
    // this.http.post('https://3691-124-253-122-181.ngrok.io/upload',formData).subscribe((data)=>{
    //   // console.log('API',data);
    //   if(data){
    //     console.log(data);
    //     this.api_hit=true;
    //     this.response=data;
    //   }
    // })
  }

}
