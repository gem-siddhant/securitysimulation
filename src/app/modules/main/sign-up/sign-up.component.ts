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
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MainService } from '../service/main.service';
import { ToastrService } from 'ngx-toastr';
import { DialogRole, MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { InfomodalComponent } from 'src/app/shared/infomodal/infomodal.component';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm:FormGroup;
  StoreData:boolean=true;
  color: ThemePalette = 'primary';
  value = 50;
  api_hit=false;
  mode: ProgressSpinnerMode = 'indeterminate';
  constructor(private formBuilder: FormBuilder,
    private _MainService:MainService,
    private _auth:AuthService,
    private router:Router,
    private toastr: ToastrService,
    private dialog:MatDialog) {
      this.signupForm = this.formBuilder.group({});
    }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
        name:['',Validators.required],
        email:['',Validators.email],
        jobdesc:['',Validators.required],
        purpose:['',Validators.required]
    });
  }
  submit(){
    if (this.signupForm.value.name == "")
    {
      this.toastr.error("Please Provide name");
    }
    if (this.signupForm.value.jobdesc == "")
    {
      this.toastr.error("Please Provide Your Designation");
    }
    if (this.signupForm.value.email == "")
    {
      this.toastr.error("Please Provide Email ");
    }
    if (this.signupForm.value.purpose == "")
    {
      this.toastr.error("Please Mention Your Purpose");
    }
    const formData :any= new FormData();
    if(this.signupForm.invalid)
    return;
    let reqBody={
      "empName":this.signupForm.value.name,
      "empEmail":this.signupForm.value.email,
      'jobDescription':this.signupForm.value.jobdesc,
      "purpose":this.signupForm.value.purpose
    }
   let con = JSON.stringify(reqBody);
   
   this.StoreData=false;
    this._MainService.signUp(reqBody).subscribe((data)=>{
      if(data){
        this.StoreData=true;
        let dataDialog = { title: 'Onboarding Request Submitted!' };
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
          width: '400px',
          height: '400px',
          data: dataDialog
        });
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['main/sign-up']);
        })
      }
    },
    (err)=>{
      this.StoreData=true;
       if(err.status==200){
        console.log('err',err);
        this.router.navigate(['Onboard/requestsubmit']);
        
      }
      else if(err.status==208)
      {
        let dataDialog = { title: 'You have Already Been Onboarded!' };
        const dialogRef = this.dialog.open(InfomodalComponent, {
          width: '400px',
          height: '400px',
          data: dataDialog
        });
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['main/sign-up']);
        })
      }
      else if (err.status==409)
      {
        let dataDialog = { title: 'Your Request is still under Process' };
        const dialogRef = this.dialog.open(InfomodalComponent, {
          width: '400px',
          height: '400px',
          data: dataDialog
        });
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['main/sign-up']);
        })
      }
      else if (err.status==403)
      {
        let dataDialog = { title: 'Your are not Authorized to use this application' };
        const dialogRef = this.dialog.open(InfomodalComponent, {
          width: '400px',
          height: '400px',
          data: dataDialog
        });
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['main/sign-up']);
        })
      }
    }
    
    )
  }

}
