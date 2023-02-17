import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientOnboardService } from '../Services/client-onboard.service';
import { OnboardapiserviceService } from '../Services/onboardapiservice.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  onboardform:FormGroup;
  clientid:any;
  prefilled : {clientName:'',clientAddress:'',officialEmail:'',clientContactNumber:''};
  constructor(private formBuilder: FormBuilder,
    private shared: ClientOnboardService,
    private router:Router,
    private clientservice: OnboardapiserviceService) { 
    this.onboardform = this.formBuilder.group({})
  }

  ngOnInit(): void {
    this.clientid = this.shared.getemail().clientid
    this.onboardform = this.formBuilder.group({
      clientname:[{ value: '', disabled: true },
      [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.pattern(/^\S+@\S+\.\S+$/),
      ],],
      clientaddress:[{ value: '', disabled: true }],
      officialemail:[{ value: '', disabled: true }],
      contact:[{ value: '', disabled: true }],
  });
  this.getPrefilledclientdetails()
  }

  getPrefilledclientdetails()
  {
    this.clientservice.getClientDetails(this.clientid).subscribe((data)=>
    {
      if(data)
      {
        this.prefilled = data
      }
    })
  }

  routeto(){
    this.router.navigate(['client-onboard/plan-details'])
  }
}
