import { Component, OnInit } from '@angular/core';
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
import { AddCampaignService } from '../service/add-campaign.service';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { DialogRole, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.css']
})
export class AddCampaignComponent implements OnInit {
phisingForm:FormGroup;
test: any = null;
file: File = this.test;
submitted=false;
response:any;
api_hit=false;
changeTriggered=false;
  constructor(private _addCampaign:AddCampaignService, private formBuilder: FormBuilder,private dialog:MatDialog,private router:Router) {
    this.phisingForm = this.formBuilder.group({});

  }

  ngOnInit(): void {
    this.phisingForm = this.formBuilder.group({
      name:['', Validators.required],
      reward_type:['',Validators.required],
      desc:['',Validators.required],
      reward_amount:['',Validators.required],
      tempate_select:[0,Validators.required],
      attachmentFile:[''],
      subject:['',Validators.required]

    });
  }
  onChange(event: any) {
    this.changeTriggered = true;
    this.file = event.target.files[0];
  }
  submitForm(){


    console.log(this.file);
    this.submitted=true;
    if(this.phisingForm.invalid)
    return;
    console.log(this.phisingForm.value);
    const formData :any= new FormData();
    let reqBody={
      'name':this.phisingForm.value.name,
      'templateDescription':this.phisingForm.value.desc,
      'templateAmount':this.phisingForm.value.reward_amount.toString(),
      'templateNo':this.phisingForm.value.tempate_select,
      'templateRewardType':this.phisingForm.value.reward_type,
      'templateHeading':this.phisingForm.value.subject,
      'createdBy':localStorage.getItem('email')
    }
    console.log('FORM',reqBody);
    let con = JSON.stringify(reqBody);
    formData.append("details",con);
    formData.append("file",this.file);

    this._addCampaign.createCampaign(formData).subscribe((data)=>{
      if(data){
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
