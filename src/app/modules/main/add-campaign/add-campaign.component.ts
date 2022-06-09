import { Component, OnInit, Pipe, PipeTransform, ViewEncapsulation } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
  NgForm,
} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { ThemePalette } from '@angular/material/core';
import { AddCampaignService } from '../service/add-campaign.service';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { DialogRole, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';

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
prefilled:any={heading:'',amount:'',rewardType:'',subject:'',description:''};
testhtml:any='';
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
  desc:[''],
  reward_amount:[''],
  tempate_select:[0,Validators.required],
  attachmentFile:[''],
  subject:[''],
  email:['',Validators.required],
  //password:['',Validators.required]
});

  }
  onChange(event: any) {
    this.changeTriggered = true;
    this.file = event.target.files[0];
  }
  getPreFilledData(id:any,){

    this._addCampaign.getPrefilled(id).subscribe((data)=>{

      console.log('data',data)
      this.prefilled=data;
      if(this.prefilled.subject){
        this.phisingForm.value.subject=this.prefilled.subject;

      }
      if(this.prefilled.rewardType){
        this.phisingForm.value.reward_type=this.prefilled.rewardType;
      }

      if(this.prefilled.description){
        this.phisingForm.value.desc=this.prefilled.description;

      }
      if(this.prefilled.amount){
        this.phisingForm.value.amount=this.prefilled.amount;
      }
    })
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
      //'password':this.phisingForm.value.password

    }
    console.log('FORM',reqBody);
    let con = JSON.stringify(reqBody);
    formData.append("details",con);
    formData.append("file",this.file);
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
