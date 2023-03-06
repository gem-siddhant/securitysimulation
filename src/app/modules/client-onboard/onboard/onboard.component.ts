import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { ClientOnboardService } from '../Services/client-onboard.service';
import { OnboardapiserviceService } from '../Services/onboardapiservice.service';

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.css']
})
export class OnboardComponent implements OnInit {
  onboardform:FormGroup;
  sentotp:boolean = false;
  checkemailexp: any;
  linkexpired: boolean = false;
  clientname:any;
  clientid:any;
  planid:any;
  clientemail:any;

  constructor(private formBuilder: FormBuilder, 
    private toastr:ToastrService,
    private router:Router,
    private route:ActivatedRoute,
    private shared: ClientOnboardService,
    private clientservice: OnboardapiserviceService,
    private commonService : CommonService 
    ) { 
    this.onboardform = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.checkemailexp = this.commonService.decrypt(params["v5"]); //params["LinkExpiraition"]
        this.clientname = this.commonService.decrypt(params["v1"]); //params["ClientName"]
        this.planid = this.commonService.decrypt(params["v2"]); //params["PlanId"]
        this.clientemail = this.commonService.decrypt(params["v3"]); //params["Email"]
        this.clientid = this.commonService.decrypt(params["v4"]); //params["ClientID"]
      }
    )
    // this.clientemail = "ayush.tiwary@geminisolutions.com"
    let param = {
      'clientname': this.clientname,
      'planid': this.planid,
      'clientid': this.clientid,
      'clientemail':this.clientemail
    }
    this.shared.setemail(param)
    console.log("inside onboard")
    let reqbody = {
      'expirationTime': this.checkemailexp,
      'clientId' : this.clientid
    }
    this.clientservice.checkexpiration(reqbody).subscribe((data:any)=>
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
      email:[{value:'',disabled:true},Validators.email],
      otp:['',Validators.required],
      
  });
  }

  // validating OTP 
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
      'email': this.clientemail
    }
    // this.router.navigate(['client-onboard/generate-password'])
    this.clientservice.validateclientotp(req).subscribe((data)=>
    {
      if(data)
      {
        console.log(data.message)
        this.router.navigate(['client-onboard/generate-password'])
      if(data.message=='Invalid OTP'){
        this.toastr.error("Incorrect OTP",undefined,
      {
        positionClass: 'toast-top-center'
      }
      );
      }
      if(data.message=='Valid OTP')
      {
        this.router.navigate(['client-onboard/generate-password'])
      }
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

  // generating otp 
  sendotp()
  { 
    this.sentotp=true
    console.log("otpsenttoclient")
    let req = {
      'email': this.clientemail
    }
    this.clientservice.sendotptoclient(req).subscribe((data)=>
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
