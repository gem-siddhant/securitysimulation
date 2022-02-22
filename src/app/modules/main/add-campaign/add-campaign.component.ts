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
prefilled:any={heading:'',amount:'',rewardType:'',subject:'',description:''};
testhtml:any=`<table style="background:#fff;border:1px solid #d9d9d9" border="0" align="center" width="650px" cellspacing="0" cellpadding="0">
<tbody>
  <tr>
    <td style="padding:10px 15px;width:620px">
      <table style="border:0;width:620px;text-align:center" cellpadding="0" cellspacing="0">
        <tbody><tr>
          <td style="text-align:center;vertical-align:middle;font-size:0"><img src="https://www.linkpicture.com/q/unnamed-1_15.png" border="0" height="80" class="CToWUd"></td>

        </tr>
      </tbody></table>
    </td>
  </tr>
  <tr>
    <td><img src="https://ci6.googleusercontent.com/proxy/_hPTizEaz8VXHMdHoHW93gyd1nTxebOFczq7PAI0GqNAk34zenmiQF2Rd1g6uD6DgDLOStyVxVm3PJzlRdRLVzuJCkd9EfkQW6cg80CrMm9ibw2B6Co=s0-d-e1-ft#https://img.pineperks.in/resources/images/email/voucher-details.jpg" style="display:block;width:650px" width="650px" border="0" class="CToWUd a6T" tabindex="0"><div class="a6S" dir="ltr" style="opacity: 0.01; left: 630.5px; top: 345px;"><div id=":1ev" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" role="button" tabindex="0" aria-label="Download attachment " data-tooltip-class="a1V" data-tooltip="Download"><div class="akn"><div class="aSK J-J5-Ji aYr"></div></div></div></div></td>
  </tr>
  <tr>
    <td style="line-height:10px;background:#f6861f">&nbsp;</td>
  </tr>
  <tr>
    <td bgcolor="#fff" style="background:#f6861f">
      <table border="0" align="center" width="634" cellspacing="0" cellpadding="0">
        <tbody>
          <tr>
            <td style="padding:10px" align="left" valign="top">

              <table style="margin:0 auto" border="0" width="100%" cellspacing="0" cellpadding="0">
                <tbody>
                  <tr>
                    <td colspan="2" style="padding-top:14px;font-family:Calibri,Arial,sans-serif;color:#fff;font-size:17px" align="left" valign="top"><strong>Dear Arihant Singla,</strong></td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding-top:14px;font-family:Calibri,Arial,sans-serif;color:#fff;font-size:16px" align="left" valign="top">As a part of welcome program for our project Contripoint, we are provding amazon vouchers to the employees. You can find details of your amazon voucher with this email.</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding-top:14px;font-family:Calibri,Arial,sans-serif;color:#fff;font-size:16px" align="left" valign="top">Details of your Amazon <span class="il">Gift</span> <span class="il">Voucher</span> are given below -</td>
                  </tr>

                  <tr>
                    <td colspan="2" style="padding-top:7px;font-family:Calibri,Arial,sans-serif;color:#fff;font-size:16px">
                      <table style="background:#e3750f;padding:10px;width:604px" cellpadding="0" cellspacing="5" border="0">
                        <tbody><tr>
                          <td style="font-family:Calibri,Arial,sans-serif;color:#fff;font-size:16px;width:200px;padding:0" valign="top">Brand</td>

                          <td style="font-family:Calibri,Arial,sans-serif;color:#fff;font-size:16px;width:50px;padding:0" valign="top">:</td>

                          <td style="font-family:Calibri,Arial,sans-serif;color:#fff;font-size:16px;width:250px;padding:0" valign="top">Amazon</td>
                        </tr>
                        <tr>
                          <td style="font-family:Calibri,Arial,sans-serif;color:#fff;font-size:16px;width:200px;padding:0" valign="top"><span class="il">Voucher</span> Value</td>

                          <td style="font-family:Calibri,Arial,sans-serif;color:#fff;font-size:16px;width:50px;padding:0" valign="top">:</td>

                          <td style="font-family:Calibri,Arial,sans-serif;color:#fff;font-size:16px;width:250px;padding:0" valign="top">Rs. 500.00</td>
                        </tr>

                      </tbody></table>
                    </td>
                  </tr>

                  <tr>
                    <td colspan="2" style="padding-top:10px;font-family:Calibri,Arial,sans-serif;color:#fff;font-size:16px" align="left" valign="top">Click on the following button to avail your gift vouchers:</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding-top:12px;font-family:Calibri,Arial,sans-serif;color:#fff;font-size:24px" align="left" valign="top"><button style="height:40px; width:150px;background-color: #ed1c6a; color:#fff;border:none; border-radius: 20px; font-size: 18px;">Click Here!</button></td>
                  </tr>

                  <tr>
                    <td colspan="2" style="padding-top:14px;font-family:Calibri,Arial,sans-serif;color:#fff;font-size:16px" align="left" valign="top">Cheers,</td>
                  </tr>

                  <tr>
                    <td colspan="2" style="font-family:Calibri,Arial,sans-serif;color:#fff;font-size:16px" align="left" valign="top">Team Contripoint</td>
                  </tr>

                </tbody>
              </table>

            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>



</tbody>
</table>`
testFINAL=this.sanitized.bypassSecurityTrustHtml(this.testhtml)
  constructor(private _addCampaign:AddCampaignService,
     private formBuilder: FormBuilder,
     private dialog:MatDialog,private router:Router,
     private sanitized: DomSanitizer) {
    this.phisingForm = this.formBuilder.group({});

  }

  ngOnInit(): void {
    this.phisingForm = this.formBuilder.group({
      name:['', ],
      reward_type:[''],
      desc:[''],
      reward_amount:[''],
      tempate_select:[0,Validators.required],
      attachmentFile:[''],
      subject:['']

    });


  }
  onChange(event: any) {
    this.changeTriggered = true;
    this.file = event.target.files[0];
  }
  getPreFilledData(id:any){
    this._addCampaign.getPrefilled(id).subscribe((data)=>{
      console.log('data',data)
      this.prefilled=data;
      if(this.prefilled.heading){
        this.phisingForm.value.name=this.prefilled.heading;
        this.phisingForm.controls["name"].setValidators([
          Validators.required,
        ]);
      }
      if(this.prefilled.rewardType){
        this.phisingForm.value.reward_type=this.prefilled.rewardType;
        this.phisingForm.controls["reward_type"].setValidators([
          Validators.required,
        ]);
      }
      if(this.prefilled.subject){
        this.phisingForm.value.subject=this.prefilled.subject;
        this.phisingForm.controls["subject"].setValidators([
          Validators.required,
        ]);
      }
      if(this.prefilled.amount){
        this.phisingForm.value.amount=this.prefilled.amount;
        this.phisingForm.controls["reward_amount"].setValidators([
          Validators.required,
        ]);
      }
    })
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
