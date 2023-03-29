import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpServiceService } from '../Services/emp-service.service';
import { EmponboardapiService } from '../Services/emponboardapi.service';
import { ConfirmPasswordValidator } from "./confirm-password.validator";

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent implements OnInit {
  onboardform:FormGroup;
  password = '';
  Passwordmetcriteria = false;
  showPassword = false;
  useremail:string = '';
  passwordStrengthClasses = {
    weak: true,
    medium: false,
    strong: false
  };
  criteria = [
    { name: 'Minimum length of 8 characters', met: false },
    { name: 'At least one uppercase letter', met: false },
    { name: 'At least one lowercase letter', met: false },
    { name: 'At least one number', met: false }
  ];
  constructor(private formBuilder: FormBuilder,
    private router:Router,
    private toastr:ToastrService,
    private shared: EmpServiceService,
    private _useronboardapi : EmponboardapiService) {
      this.onboardform = this.formBuilder.group({})
     }

  ngOnInit(): void {
    this.useremail = this.shared.getemail().useremail
    this.onboardform = this.formBuilder.group(
      {
      password:['',Validators.required],
      confirmpass:['',this.confirmPasswordValidator],
  },)
  }
  updateCriteria(password: string): void {
    this.criteria[0].met = password.length >= 16;
    this.criteria[1].met = /[A-Z]/.test(password);
    this.criteria[2].met = /[a-z]/.test(password);
    this.criteria[3].met = /\d/.test(password);
    if(this.criteria[0].met == true &&
      this.criteria[1].met == true &&
      this.criteria[2].met == true &&
      this.criteria[3].met == true)
      {
        this.Passwordmetcriteria = true;
        console.log(this.Passwordmetcriteria)
      }
      else{
        this.Passwordmetcriteria = false;
      }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  isConfirmPasswordValid(): boolean {
    return this.onboardform.value.password === this.onboardform.value.confirmpass;
  }


  confirmPasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.root.get('password');
    if (password && control.value !== password.value) {
      return { confirmpass: true };
    }
    return null;
  }
  routeto(){
    if(this.onboardform.value.password == "" ||  this.onboardform.value.confirmpass == "")
    {
      this.toastr.error("Please create your password", undefined, {
        positionClass: 'toast-top-center'
   })
      return
    }
    else{
      let req = {
        'username':this.useremail,
        'password':this.onboardform.value.password
      }
      this._useronboardapi.submituserdetails(req).subscribe((data)=>
      {
        if(data)
        {
          console.log("client onboard done")
          this.router.navigate(['main/login'])
          this.toastr.success("Employee onboarded successfully")
        }
      },(err)=>{
        if(err.status!=200)
        {
          this.toastr.error("Error while submitting",undefined,
          {
            positionClass: 'toast-top-center'
          }
          );
        }
      })
  }
  }
}
