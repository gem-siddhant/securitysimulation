import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { DashboardapiService } from '../../../dashboard-services/dashboardapi.service';

@Component({
  selector: 'app-client-invite',
  templateUrl: './client-invite.component.html',
  styleUrls: ['./client-invite.component.css']
})
export class ClientInviteComponent implements OnInit {
  inviteform: FormGroup;
  StoreData:boolean=true;
  color: ThemePalette = 'primary';
  value = 50;
  api_hit=false;
  mode: ProgressSpinnerMode = 'indeterminate';
  errormsg : boolean = false;
  currentdate = new Date()
  financialYearEnd = new Date(this.currentdate.getFullYear() + 1, 2, 31);
  constructor(public dialogRef: MatDialogRef<ClientInviteComponent>,
    private formBuilder: FormBuilder, 
    private router:Router,
    private dialog:MatDialog,
    private toastr:ToastrService,
    private _inviteclient: DashboardapiService
    ) { }

  ngOnInit(): void {
    this.inviteform = this.formBuilder.group({
      clientmail:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9]*$')]],
      pocmail:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      // plan:['',Validators.required],
      // currency:['',Validators.required],
      // cost:['',[Validators.required]],
      startdate:['',Validators.required],
      enddate:['',Validators.required],
      // admincount:['',[Validators.required]],
      usercount:['',[Validators.required]],
      contact:['',[Validators.required,Validators.pattern('^[0-9]*$')]],
      address:['',Validators.required],
      officialemail:['',[Validators.required,Validators.pattern(RegExp(/^[a-zA-Z0-9]+\.?[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]{2,3}$/))]]
  });
  }
  
  close()
  {
    this.dialogRef.close();
  }

  errorCheck()
  {
    if(this.inviteform.value.clientmail== ""||
      this.inviteform.value.plan=="" ||
      this.inviteform.value.pocmail == "" ||
      this.inviteform.value.currency == "" ||
      this.inviteform.value.address == "" ||
      this.inviteform.value.officialemail == "" ||
      this.inviteform.value.contact == "" 
      )
      {
        this.errormsg = true
        return
      }
  }
  sendinvite()
  {
    this.errorCheck()
    const startDate = moment(this.inviteform.value.startdate).format("MM-DD-YYYY");
    const endDate = moment(this.inviteform.value.enddate).format("MM-DD-YYYY");
    
    let req = {
    'representativeEmail': this.inviteform.value.pocmail,
    "planName": 'GOLD',
    "currency": 'INR',
    "yearlyCost": 100,
    "noOfAdmins": 12,
    "userLimit": this.inviteform.value.usercount,
    "clientName": this.inviteform.value.clientmail,
    "clientAddress": this.inviteform.value.address,
    "officialEmail": this.inviteform.value.officialemail,
    "clientContactNumber": this.inviteform.value.contact,
    "startDate": startDate,
    "endDate": endDate,
    "invitedBy":localStorage.getItem('email')
    }
    if(!this.errormsg)
    {
    this._inviteclient.inviteclient(req).subscribe((data)=>
    {
      if(data)
      {
        
      }
    },(err)=>{
      this.StoreData=true;
       if(err.status!=200){
        this.toastr.error("Error in adding campaign.");
      }
      else{
        this.toastr.success("Invite sent");
        this.close()
      }
    })
  }
}
}
