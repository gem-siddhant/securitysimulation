import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private toastr:ToastrService,) { }

  ngOnInit(): void {
    this.inviteform = this.formBuilder.group({
      clientmail:['',Validators.required],
      pocmail:['',Validators.required],
      plan:['',Validators.required],
      currency:['',Validators.required],
      cost:['',Validators.required],
      startdate:['',Validators.required],
      enddate:['',Validators.required]
  });
  }

  close()
  {
    this.dialogRef.close();
  }
  sendinvite()
  {

  }
}
