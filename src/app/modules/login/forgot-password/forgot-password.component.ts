import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  loginForm : FormGroup
  constructor(private formBuilder: FormBuilder,
    private router:Router,
    private toastr:ToastrService,
    private _login: LoginService) {
      this.loginForm = this.formBuilder.group({})
     }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
      email:['',Validators.required]
      },)
  }

  sendLink()
  {
    let req = {
      'email' : this.loginForm.value.email
    }
    this._login.sendEmailLink(req).subscribe((data)=>
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
        this.toastr.success("Invite Sent to your email",undefined,
        {
          positionClass: 'toast-top-center'
        }
        );
      }
    })
  }
}
