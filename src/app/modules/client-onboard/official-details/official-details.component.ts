import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientOnboardService } from '../Services/client-onboard.service';

@Component({
  selector: 'app-official-details',
  templateUrl: './official-details.component.html',
  styleUrls: ['./official-details.component.css']
})
export class OfficialDetailsComponent implements OnInit {
  onboardform:FormGroup;
  constructor(private formBuilder: FormBuilder, 
    private router:Router,
    private shared: ClientOnboardService) {
    this.onboardform = this.formBuilder.group({})
   }

  ngOnInit(): void {
    this.onboardform = this.formBuilder.group({
      email:[''],
      fname:[''],
      lname:[''],
      designation:[''],
      managerid:[''],
      dept:[''],
  });
  }
  routeto(){
    let req = {
      'username':this.onboardform.value.email,
      'firstname':this.onboardform.value.fname,
      'lastname':this.onboardform.value.lname,
      'designation':this.onboardform.value.designation,
      'managerId':this.onboardform.value.managerid,
      'department':this.onboardform.value.dept,
    }
    this.shared.setoffdetails(req)
    this.router.navigate(['client-onboard/client-details'])
  }
}
