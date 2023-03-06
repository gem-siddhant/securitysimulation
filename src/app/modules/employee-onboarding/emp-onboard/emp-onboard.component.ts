import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientOnboardService } from '../../client-onboard/Services/client-onboard.service';
import { EmpServiceService } from '../Services/emp-service.service';
import { EmponboardapiService } from '../Services/emponboardapi.service';

@Component({
  selector: 'app-emp-onboard',
  templateUrl: './emp-onboard.component.html',
  styleUrls: ['./emp-onboard.component.css']
})
export class EmpOnboardComponent implements OnInit {
  onboardform:FormGroup;
  sentotp:boolean = false;
  checkemailexp: any;
  linkexpired: boolean = false;
  userid:any;
  useremail:any;
  constructor(private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private router:Router,
    private route:ActivatedRoute,
    private shared: EmpServiceService,
    private _emponbaord: EmponboardapiService) { 
    this.onboardform = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.checkemailexp = params["LinkExpiraition"]
        this.useremail = params["email"]
        this.userid = params["userId"]
      }
    )
    let param = {
      'userid': this.userid,
      'useremail':this.useremail,
    }
    this.shared.setemail(param)
    console.log("inside onboard")
    let reqbody = {
      'expirationTime': this.checkemailexp
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
    let req = {
      'otp':this.onboardform.value.otp,
      'email': this.useremail
    }
    // this.router.navigate(['employee-onboard/generate-password'])
    this._emponbaord.validateclientotp(req).subscribe((data)=>
    {
      if(data)
      {
        
      }
      if(data.message=='Invalid OTP'){
        this.toastr.error("Incorrect OTP",undefined,
      {
        positionClass: 'toast-top-center'
      }
      );
      }
      if(data.message=='Valid OTP')
      {
        this.router.navigate(['employee-onboard/generate-password'])
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
    }
    )
  }

  sendotp()
  {
    this.sentotp=true
    console.log("otpsenttoclient")
    let req = {
      'email': this.useremail
    }
    this._emponbaord.sendotptoclient(req).subscribe((data)=>
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
    })
  }

}
