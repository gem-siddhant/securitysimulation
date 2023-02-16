import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpServiceService } from '../Services/emp-service.service';
import { EmponboardapiService } from '../Services/emponboardapi.service';

@Component({
  selector: 'app-official-details',
  templateUrl: './official-details.component.html',
  styleUrls: ['./official-details.component.css']
})
export class OfficialDetailsComponent implements OnInit {
  onboardform:FormGroup;
  passworddetails : any;
  userid:any;
  useremail : string;
  prefilled = {userInfo: {
    infoId: 0,
    firstName: '',
    lastName: '',
    designation: '',
    managerId: '',
    department: ''}}
  constructor(private formBuilder: FormBuilder, 
    private router:Router,
    private toastr:ToastrService,
    private shared: EmpServiceService,
    private _useronboardapi : EmponboardapiService) {
      this.onboardform = this.formBuilder.group({})
     }

  ngOnInit(): void {
    this.userid = this.shared.getemail().userid
    this.useremail = this.shared.getemail().useremail
    this.onboardform = this.formBuilder.group({
      email:[{ value:'',disabled: true}],
      fname:[{ value:'',disabled: true}],
      lname:[{ value:'',disabled: true}],
      designation:[{ value:'',disabled: true}],
      managerid:[{ value:'',disabled: true}],
      dept:[{ value:'',disabled: true}],
  });
  this.getPrefilledUserDetails()
  }
getPrefilledUserDetails()
{
  this._useronboardapi.getUserDetails(this.userid).subscribe((data)=>
  {
    if(data)
    {
      this.prefilled = data
    }
    else{
      this.toastr.error("No Records found", undefined, {
        positionClass: 'toast-top-center'
      });
    }
  })
}


  routeto(){
    this.passworddetails = this.shared.getpassword()
    let req = {
      'username':this.useremail,
      'password':this.passworddetails.password,
    }
    this._useronboardapi.submituserdetails(req).subscribe((data)=>
    {
      if(data)
      {
        console.log("client onboard done")
      }
    },(err)=>{
      if(err.status!=200)
      {
        this.toastr.error("Error while submitting",undefined,
        {
          positionClass: 'toast-top-center'
        }
        );
      }
      else{
        this.toastr.error("You are successfully onboarded",undefined,
        {
          positionClass: 'toast-top-center'
        }
        );
      }
    })
  }
}
