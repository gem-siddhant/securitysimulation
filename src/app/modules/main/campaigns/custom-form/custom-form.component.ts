import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { RescheduleComponent } from 'src/app/shared/reschedule/reschedule.component';
import { SendCampaignModalComponent } from 'src/app/shared/send-campaign-modal/send-campaign-modal.component';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.css']
})
export class CustomFormComponent implements OnInit {

  templateId : Number;
  templateForm: FormGroup;
  screenSize : String;
  constructor(
    private commonService : CommonService,
    private responsiveService : ResponsiveService,
    private formBuilder : FormBuilder,
    private router: ActivatedRoute,
    private dialog: MatDialog,
  ) { 
    this.templateId = 4;
    this.templateForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
    this.screenSize = 'lg';
    this.router.paramMap.pipe(take(1)).subscribe((params) =>{
      this.templateId = Number(params?.get("id"));
    })
    let emails = new FormArray([]);
    this.templateForm = this.formBuilder.group({
      name : ["", Validators.required],
      description : ["", Validators.required],
      subject : ["", Validators.required],
      note : ["", Validators.required],
      emailSignature : ["", Validators.required],
      addDescription : [false],
      allEmails : emails,
    });
    this.addEmailField();
    this.checkScreenStatus();
    this.onResize();
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

  onChange(event : Event) : void{

  }

  onResize() : void{
    this.responsiveService.checkWidth();
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

  sendCampaign() : void{
    console.log(this.templateForm.value);
    const dialogRef = this.dialog.open(SendCampaignModalComponent, {
      width: '700px',
      });
  }

  scheduleCampaign() : void{
    const dialogRef = this.dialog.open(RescheduleComponent, {
      width: '700px',
      });
  } 
}
