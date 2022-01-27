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

@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.css']
})
export class AddCampaignComponent implements OnInit {
phisingForm:FormGroup;
test: any = null;
file: File = this.test;
changeTriggered=false;
  constructor( private formBuilder: FormBuilder,private http:HttpClient) {
    this.phisingForm = this.formBuilder.group({});

  }

  ngOnInit(): void {
    this.phisingForm = this.formBuilder.group({
      name:['', Validators.required],
      reward_type:['',Validators.required],
      desc:['',Validators.required],
      reward_amount:['',Validators.required],
      tempate_select:[0,Validators.required],
      attachmentFile:['']

    });
  }
  onChange(event: any) {
    this.changeTriggered = true;
    this.file = event.target.files[0];
  }
  submitForm(){
    console.log(this.phisingForm.value);
    const formData :any= new FormData();
    let reqBody={
      'name':this.phisingForm.value.name,
      'templateDescription':this.phisingForm.value.desc,
      'templateAmount':this.phisingForm.value.reward_amount.toString(),
      'templateNo':this.phisingForm.value.tempate_select,
      'templateRewardType':this.phisingForm.value.reward_type,
      // 'file':this.file
    }
    console.log('FORM',reqBody);
    let con = JSON.stringify(reqBody);
    formData.append("details",con);
    this.http.post('https://774e-203-115-84-239.ngrok.io/upload',formData).subscribe((data)=>{
      console.log('API',data);
    })
  }
}
