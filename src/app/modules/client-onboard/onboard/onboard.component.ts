import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  constructor(private formBuilder: FormBuilder, 
    private toastr:ToastrService,
    private router:Router,
    private route:ActivatedRoute,
    private clientservice: OnboardapiserviceService
    ) { 
    this.onboardform = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.checkemailexp = params["LinkExpiraition"]
        // this.clinetname = params["ClientName"]
        // this.clinetid = params["ClientID"]
      }
    )
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
    this.router.navigate(['client-onboard/generate-password'])
  }
  sendotp()
  {
    this.sentotp=true
  }

}
