import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private clientservice: OnboardapiserviceService
    ) { 
    this.onboardform = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.checkemailexp = params["LinkExpiraition"]
        this.clientname = params["ClientName"]
        this.planid = params["PlanId"]
        this.clientemail = params["Email"]
        this.clientid = params["ClientID"]
      }
    )
    this.clientemail = "ayush.tiwary@geminisolutions.com"
    let param = {
      'clientname': this.clientname,
      'planid': this.planid,
      'clientid': this.clientid,
      'clientemail':this.clientemail
    }
    this.shared.setemail(param)
    console.log("inside onboard")
    let reqbody = {
      'expirationTime': this.checkemailexp
    }
    this.clientservice.checkexpiration(reqbody).subscribe((data:any)=>
    {
      if(data)
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
    this.clientservice.validateclientotp(this.onboardform.value.otp).subscribe((data)=>
    {
      if(data)
      {
        // this.router.navigate(['client-onboard/generate-password'])
      }
      else{
        this.toastr.error("Incorrect OTP",undefined,
      {
        positionClass: 'toast-top-center'
      }
      );
      }
    })
    this.router.navigate(['client-onboard/generate-password'])
  }

  // generating otp 
  sendotp()
  { 
    this.sentotp=true
    console.log("otpsenttoclient")
    this.clientservice.sendotptoclient(this.clientemail).subscribe((data)=>
    {
      if(data)
      {
        this.sentotp=true
      }
    })
  }

}
