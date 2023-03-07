import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmponboardapiService } from '../../employee-onboarding/Services/emponboardapi.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm:FormGroup;
  password = '';
  Passwordmetcriteria = false;
  showPassword = false;
  passwordStrengthClasses = {
    weak: true,
    medium: false,
    strong: false
  };
  emailexp : any;
  email : any;
  linkexpired: boolean = false;
  criteria = [
    { name: 'Minimum length of 8 characters', met: false },
    { name: 'At least one uppercase letter', met: false },
    { name: 'At least one lowercase letter', met: false },
    { name: 'At least one number', met: false }
  ];
  constructor(private formBuilder: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private toastr:ToastrService,
    private _login:LoginService,
    private _emponbaord: EmponboardapiService) { 
      this.resetForm = this.formBuilder.group({})
    }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group(
      {
      password:['',Validators.required],
      confirmpass:['',this.confirmPasswordValidator],
  },)
  this.route.queryParams.subscribe(
    params => {
      this.emailexp = params["expirationTime"]
      this.email = params["email"]
    }
  )
  let reqbody = {
    'expirationTime': this.emailexp
  }
  this._emponbaord.checkexpiration(reqbody).subscribe((data:any)=>
  {
    if(data || !data)
    {
      if(data==false)
      {
        this.linkexpired = true
      }
      if(this.linkexpired == true)
      {
        this.toastr.error("Onboard link has Expired",undefined,
        {
          positionClass: 'toast-top-center'
        }
        );
        return;
      }
    }
  })
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
    return this.resetForm.value.password === this.resetForm.value.confirmpass;
  }


  confirmPasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.root.get('password');
    if (password && control.value !== password.value) {
      return { confirmpass: true };
    }
    return null;
  }

  resetpassword()
  {
    let req = {
      'email' : this.email,
      'password' : this.resetForm.value.password
    }
    this._login.resetPassword(req).subscribe((data)=>
    {
      if(data)
      {

      }
    },(err)=>{
      if(err.status!=200)
      {
        this.toastr.error("Something Went Wrong",undefined,
        {
          positionClass: 'toast-top-center'
        }
        );
      }
      else{
        this.toastr.success("Your Password is updated",undefined,
        {
          positionClass: 'toast-top-center'
        }
        );
        this.router.navigate(['main/login'])
      }
    })
  }
}
