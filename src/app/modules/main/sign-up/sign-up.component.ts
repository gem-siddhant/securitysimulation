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
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm:FormGroup;
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
        name:[''],
        email:['',Validators.email],
        jobdesc:['',Validators.required],
        purpose:['',Validators.required]
    });
  }
  submit(){
    if (this.signupForm.value.name == "")
    {
      this.toastr.error("Please Provide username");
    }
    if (this.signupForm.value.jobdesc == "")
    {
      this.toastr.error("Please Provide Your Job Description");
    }
    if (this.signupForm.value.purpose == "")
    {
      this.toastr.error("Please Mention Your Purpose");
    }
    if(this.signupForm.invalid)
    return;
    let obj={
      "username":this.signupForm.value.name,
      "email":this.signupForm.value.email,
      "jobDescription":this.signupForm.value.jobdesc,
      "purpose":this.signupForm.value.purpose
    }
    this._MainService.signUp(obj).subscribe((data)=>{
      if(data){
        let dataDialog = { title: 'User Onboarding Request Sent!' };
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
          width: '513px',
          data: dataDialog
        });
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['main/login']);
        })
      }
    })
  }

}
