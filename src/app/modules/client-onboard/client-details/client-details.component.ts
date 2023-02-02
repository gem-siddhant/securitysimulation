import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
      clientname:[''],
      clientaddress:[''],
      officialemail:[''],
      contact:[''],
  });
  }
  routeto(){
    this.router.navigate(['client-onboard/plan-details'])
  }
}
