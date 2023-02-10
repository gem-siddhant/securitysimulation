import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  onboardform:FormGroup;
  constructor(private formBuilder: FormBuilder, private router:Router,) { 
    this.onboardform = this.formBuilder.group({})
  }

  ngOnInit(): void {
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
  }
  routeto(){
    this.router.navigate(['client-onboard/plan-details'])
  }
}
