import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.css']
})
export class OnboardComponent implements OnInit {
  onboardform:FormGroup;
  sentotp:boolean = false;
  constructor(private formBuilder: FormBuilder, private router:Router,) { 
    this.onboardform = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.onboardform = this.formBuilder.group({
      email:['',Validators.email],
      otp:['',Validators.email],
      
  });
  }
  routeto(){
    this.router.navigate(['client-onboard/generate-password'])
  }
  sendotp()
  {
    this.sentotp=true
  }

}
