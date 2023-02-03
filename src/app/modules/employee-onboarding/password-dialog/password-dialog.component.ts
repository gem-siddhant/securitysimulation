import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpServiceService } from '../Services/emp-service.service';
import { ConfirmPasswordValidator } from "./confirm-password.validator";

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent implements OnInit {
  onboardform:FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router:Router,
    private shared: EmpServiceService) {
      this.onboardform = this.formBuilder.group({})
     }

  ngOnInit(): void {
    this.onboardform = this.formBuilder.group(
      {
      password:['',Validators.email],
      confirmpass:['',Validators.email],
  },

  );
  }


  
  routeto(){
    let req = {
      'password': this.onboardform.value.createpass
    }
    this.shared.setpassword(req)
    this.router.navigate(['employee-onboard/official-details'])
  }

}
