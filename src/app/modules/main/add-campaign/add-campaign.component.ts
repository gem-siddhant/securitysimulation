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
import { AddCampaignService } from '../service/add-campaign.service';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { DialogRole, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
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

phisingForm:FormGroup;
test: any = null;
file: File = this.test;
submitted=false;
response:any;
api_hit=false;
changeTriggered=false;
testhtml:any=`<div dir="ltr">
<span style="color:rgb(80,0,80)">
   <p class="MsoNormal" style="margin-right:0cm;margin-left:0cm;font-size:12pt;font-family:&quot;Times New Roman&quot;,serif;text-align:justify"><span style="font-size:10pt;font-family:Verdana,sans-serif;color:black">Dear All ,&nbsp;</span></p>
   <p class="MsoNormal" style="margin-right:0cm;margin-left:0cm;font-size:12pt;font-family:&quot;Times New Roman&quot;,serif;text-align:justify"><span style="font-size:10pt;font-family:Verdana,sans-serif;color:black">&nbsp;</span><u></u><u></u></p>
   <p class="MsoNormal" style="margin-right:0cm;margin-left:0cm;font-size:12pt;font-family:&quot;Times New Roman&quot;,serif;text-align:justify"><span style="font-size:10pt;font-family:Verdana,sans-serif;color:black">As we are getting closer to the end of the current FY 2021-22, we are initiating the process of submission of investment proofs for income tax on the GreytHR portal (Payroll portal).&nbsp;</span><u></u><u></u></p>
   <p class="MsoNormal" style="margin-right:0cm;margin-left:0cm;font-size:12pt;font-family:&quot;Times New Roman&quot;,serif;text-align:justify"><span style="font-size:10pt;font-family:Verdana,sans-serif;color:black"><br></span></p>
   <p class="MsoNormal" style="margin-right:0cm;margin-left:0cm;font-size:12pt;font-family:&quot;Times New Roman&quot;,serif;text-align:justify"><span style="font-size:10pt;font-family:Verdana,sans-serif;color:black">Due to the current pandemic situation, we solicit your timely participation to ensure that this year end exercise is effective and completed on time .</span><span style="color:black;font-family:Verdana,sans-serif;font-size:10pt">Please note that the final date for submission of investment proofs</span><span style="color:black;font-family:Verdana,sans-serif;font-size:10pt">&nbsp;</span><b style="color:black;font-family:Verdana,sans-serif;font-size:10pt"><span style="background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial">is&nbsp;18th&nbsp;February 2022</span>&nbsp;</b><span style="color:black;font-family:Verdana,sans-serif;font-size:10pt">and you can start uploading investment proofs on GreytHR portal post effective&nbsp;</span><b style="color:black;font-family:Verdana,sans-serif;font-size:10pt"><span style="background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial">7th&nbsp;February 2022, 12:30 PM&nbsp; onwards&nbsp;.</span></b></p>
   <p class="MsoNormal" style="margin-right:0cm;margin-left:0cm;font-size:12pt;font-family:&quot;Times New Roman&quot;,serif;text-align:justify"><u></u></p>
   <p class="MsoNormal" style="margin-right:0cm;margin-left:0cm;font-size:12pt;font-family:&quot;Times New Roman&quot;,serif;text-align:justify"><b><span style="font-size:10pt;font-family:Verdana,sans-serif;color:black">Please find attached documents having</span></b><span style="font-size:10pt;font-family:Verdana,sans-serif;color:black">&nbsp;:&nbsp;</span><u></u><u></u></p>
   <p style="margin-right:0cm;margin-left:39.75pt;font-size:12pt;font-family:&quot;Times New Roman&quot;,serif;text-align:justify"><span style="font-size:10pt;font-family:Verdana,sans-serif;color:black">1.</span><span style="font-size:7pt;color:black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-size:10pt;font-family:Verdana,sans-serif;color:black">Instructions for submitting Investment Proofs</span><u></u><u></u></p>
   <p style="margin-right:0cm;margin-left:39.75pt;font-size:12pt;font-family:&quot;Times New Roman&quot;,serif;text-align:justify"><span style="font-size:10pt;font-family:Verdana,sans-serif;color:black">2.</span><span style="font-size:7pt;color:black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-size:10pt;font-family:Verdana,sans-serif;color:black">Instructions for submitting The Flexi Proofs</span><u></u><u></u></p>
   <p class="MsoNormal" style="margin-right:0cm;margin-left:0cm;font-size:12pt;font-family:&quot;Times New Roman&quot;,serif;text-align:justify"><b><span style="font-size:10pt;font-family:Verdana,sans-serif;color:black">Steps for Submission of POI’s :</span></b><u></u><u></u></p>
   <p style="margin-right:0cm;margin-left:0cm;font-size:12pt;font-family:&quot;Times New Roman&quot;,serif;text-align:justify"><span style="font-size:10pt;font-family:Verdana,sans-serif;color:black">1.</span><span style="font-size:7pt;color:black">&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-size:10pt;font-family:Verdana,sans-serif;color:black">Login onto GreytHR Portal :&nbsp;

     <button style="background:#9b2f9b;border:none;border-radius:5px;color:#ffffff;height:25px;width:70px">LOGIN</button>

   </span><u></u><u></u></p>
   <p style="margin-right:0cm;margin-left:0cm;font-size:12pt;font-family:&quot;Times New Roman&quot;,serif;text-align:justify"><span style="font-size:10pt;font-family:Verdana,sans-serif;color:black">2.</span><span style="font-size:7pt;color:black">&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-size:10pt;font-family:Verdana,sans-serif;color:black">After logging on above mentioned link by your respective credentials click on Salary tab on left side ribbon of GreytHR dashboard.</span><u></u><u></u></p>
   <p style="margin-right:0cm;margin-left:0cm;font-size:12pt;font-family:&quot;Times New Roman&quot;,serif;text-align:justify"><span style="font-size:10pt;font-family:Verdana,sans-serif;color:black">3.</span><span style="font-size:7pt;color:black">&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-size:10pt;font-family:Verdana,sans-serif;color:black">Click on Proof of Investment option &amp; submit your proofs by adding attachment against each of your claim.</span><u></u><u></u></p>
   <p style="margin-right:0cm;margin-left:0cm;font-size:12pt;font-family:&quot;Times New Roman&quot;,serif;text-align:justify"><span style="font-size:10pt;font-family:Verdana,sans-serif;color:black">4.</span><span style="font-size:7pt;color:black">&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="font-size:10pt;font-family:Verdana,sans-serif;color:black">After submitting your proofs you will get a confirmation mail as well.</span><u></u><u></u></p>
   <p style="margin-right:0cm;margin-left:0cm;font-size:12pt;font-family:&quot;Times New Roman&quot;,serif;text-align:justify"><u></u><u></u></p>

</span>
</div>`
testFINAL=this.sanitized.bypassSecurityTrustHtml(this.testhtml)
  constructor(private _addCampaign:AddCampaignService,
     private formBuilder: FormBuilder,
     private dialog:MatDialog,private router:Router,
     private sanitized: DomSanitizer) {
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
