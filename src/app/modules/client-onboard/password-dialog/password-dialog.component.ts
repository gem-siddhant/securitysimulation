import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientOnboardService } from '../Services/client-onboard.service';

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
    private shared: ClientOnboardService) { 
    this.onboardform = this.formBuilder.group({})
  }

  ngOnInit(): void {
    this.onboardform = this.formBuilder.group({
      password:['',[Validators.required]],
      confirmpass:['',this.confirmPasswordValidator]
  });
  }
  updateCriteria(password: string): void {
    this.criteria[0].met = password.length >= 8;
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
    if(this.onboardform.value.createpass != this.onboardform.value.confirmpass)
    {
      this.toastr.error("Password not matched", undefined, {
        positionClass: 'toast-top-center'
      });
      return
    }
    else
    {
    let req = {
      'password': this.onboardform.value.password
    }
    this.shared.setpassword(req)
    this.router.navigate(['client-onboard/official-details'])
  }
}

}
