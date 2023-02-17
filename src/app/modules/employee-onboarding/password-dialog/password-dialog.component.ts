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

  );
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
