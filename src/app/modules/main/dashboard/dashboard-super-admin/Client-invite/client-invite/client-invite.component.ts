import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardapiService } from '../../../dashboard-services/dashboardapi.service';

@Component({
  selector: 'app-client-invite',
  templateUrl: './client-invite.component.html',
  styleUrls: ['./client-invite.component.css']
})
export class ClientInviteComponent implements OnInit {
  inviteform: FormGroup;
  constructor(public dialogRef: MatDialogRef<ClientInviteComponent>,
    private formBuilder: FormBuilder, 
    private router:Router,
    private toastr:ToastrService,
    private _inviteclient: DashboardapiService
    ) { }

  ngOnInit(): void {
    this.inviteform = this.formBuilder.group({
      clientmail:['',Validators.required],
      pocmail:['',Validators.required],
      plan:['',Validators.required],
      currency:['',Validators.required],
      cost:['',Validators.required],
      startdate:['',Validators.required],
      enddate:['',Validators.required],
      admincount:['',Validators.required],
      usercount:['',Validators.required],
      contact:['',Validators.required],
      address:['',Validators.required],
      officialemail:['',Validators.required]
  });
  }

  close()
  {
    this.dialogRef.close();
  }
  sendinvite()
  {
    let req = {
    'representativeEmail': this.inviteform.value.pocmail,
    "planName": this.inviteform.value.plan,
    "currency": this.inviteform.value.currency,
    "yearlyCost": this.inviteform.value.cost,
    "noOfAdmins": this.inviteform.value.admincount,
    "userLimit": this.inviteform.value.usercount,
    "clientName": this.inviteform.value.clientmail,
    "clientAddress": this.inviteform.value.address,
    "officialEmail": this.inviteform.value.officialemail,
    "clientContactNumber": this.inviteform.value.contact,
    "startDate": this.inviteform.value.startdate,
    "endDate": this.inviteform.value.enddate,
    "invitedBy":localStorage.getItem('email')
    }
    this._inviteclient.inviteclient(req).subscribe((data)=>
    {
      if(data)
      {
        console.log("invite client done")
      }
    },(err)=>
    {
      if(err.status!=200)
      {
        this.toastr.error("Error while submitting form", undefined ,
        {
          positionClass:"toast-top-center"
        })
      }
      else{
        this.toastr.success("Successfully Invited Client", undefined , 
        {
          positionClass : "toast-top-center"
        })
        this.dialogRef.close();
      }
    }
    )
  }
}
