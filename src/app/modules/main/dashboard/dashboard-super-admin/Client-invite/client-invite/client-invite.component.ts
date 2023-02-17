import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  constructor(public dialogRef: MatDialogRef<ClientInviteComponent>,
    private formBuilder: FormBuilder, 
    private router:Router,
    private dialog:MatDialog,
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
    this.close()
    this.toastr.success("Invite sent")
    this.StoreData=true;
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
        
      }
    },(err)=>{
      this.StoreData=true;
       if(err.status==200){
         this.toastr.success("Invite sent")
      }
      else{
        this.toastr.error("Error in adding campaign.");
      }
    })
  }
}
