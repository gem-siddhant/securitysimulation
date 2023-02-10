import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-emp-onboard',
  templateUrl: './emp-onboard.component.html',
  styleUrls: ['./emp-onboard.component.css']
})
export class EmpOnboardComponent implements OnInit {
  onboardform:FormGroup;
  sentotp:boolean = false;
  constructor(private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private router:Router,) { 
    this.onboardform = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.onboardform = this.formBuilder.group({
      email:['',Validators.email],
      otp:['',Validators.required],
      
  });
  }

  routeto(){
    if (this.onboardform.value.otp=='')
    {
      this.toastr.error("Please enter OTP",undefined,
      {
        positionClass: 'toast-top-center'
      }
      );
      return;
    }
    this.router.navigate(['employee-onboard/generate-password'])
  }
  sendotp()
  {
    this.sentotp=true
  }

}
