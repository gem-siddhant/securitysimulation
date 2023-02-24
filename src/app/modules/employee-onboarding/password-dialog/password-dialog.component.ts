import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpServiceService } from '../Services/emp-service.service';
import { ConfirmPasswordValidator } from "./confirm-password.validator";

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent implements OnInit {
  onboardform:FormGroup;
  password = '';
  passwordStrength = '';
  showPassword = false;
  passwordStrengthClasses = {
    weak: true,
    medium: false,
    strong: false
  };
  constructor(private formBuilder: FormBuilder,
    private router:Router,
    private toastr:ToastrService,
    private shared: EmpServiceService) {
      this.onboardform = this.formBuilder.group({})
     }

  ngOnInit(): void {
    this.onboardform = this.formBuilder.group(
      {
      password:['',Validators.required],
      confirmpass:['',Validators.required],
  },
  )
  }
  checkPasswordStrength() {
    if (this.password.length < 8) {
      this.passwordStrength = 'Weak';
      this.passwordStrengthClasses = {
        weak: true,
        medium: false,
        strong: false
      };
    } else if (this.password.length >= 8 && this.password.length < 12) {
      this.passwordStrength = 'Medium';
      this.passwordStrengthClasses = {
        weak: false,
        medium: true,
        strong: false
      };
    } else {
      this.passwordStrength = 'Strong';
      this.passwordStrengthClasses = {
        weak: false,
        medium: false,
        strong: true
      };
    }
  }
  routeto(){
    if(this.onboardform.value.password == "" ||  this.onboardform.value.confirmpass == "")
    {
      this.toastr.error("Please create your password", undefined, {
        positionClass: 'toast-top-center'
   })
      return
    }
    if(this.onboardform.value.password != this.onboardform.value.confirmpass)
    {
      this.toastr.error("Password not matched", undefined, {
        positionClass: 'toast-top-center'
      });
      return
    }
    else{
    let req = {
      'password': this.onboardform.value.password
    }
    this.shared.setpassword(req)
    this.router.navigate(['employee-onboard/official-details'])
  }
  }
}
