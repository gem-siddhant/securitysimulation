import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpServiceService } from '../Services/emp-service.service';

@Component({
  selector: 'app-official-details',
  templateUrl: './official-details.component.html',
  styleUrls: ['./official-details.component.css']
})
export class OfficialDetailsComponent implements OnInit {
  onboardform:FormGroup;
  passworddetails : any;
  constructor(private formBuilder: FormBuilder, 
    private router:Router,
    private toastr:ToastrService,
    private shared: EmpServiceService) {
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
    this.passworddetails = this.shared.getpassword()
    let req = {
      'username':this.onboardform.value.email,
      'password':this.passworddetails.password,
      'firstname':this.onboardform.value.fname,
      'lastname':this.onboardform.value.lname,
      'designation':this.onboardform.value.designation,
      'managerId':this.onboardform.value.managerid,
      'department':this.onboardform.value.dept,
    }
    this.toastr.success("You are successfully onboarded");
    console.log(req)
   
  }
}
