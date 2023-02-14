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
  clientname:any;
  clientid:any;
  planid:any;
  clientemail:any;
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
        this.clientname = params["ClientName"]
        this.planid = params["PlanId"]
        this.clientemail = params["Email"]
        this.clientid = params["ClientID"]
      }
    )
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
    this._emponbaord.checkexpiration(reqbody).subscribe((data:any)=>
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
    this.router.navigate(['employee-onboard/generate-password'])
  }
  sendotp()
  {
    this.sentotp=true
  }

}
