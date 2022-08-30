import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/modules/main/service/main.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-schedule-camp',
  templateUrl: './schedule-camp.component.html',
  styleUrls: ['./schedule-camp.component.css']
})
export class ScheduleCampComponent implements OnInit {

  StoreData:boolean=true;
  phisingForm:FormGroup;
  credsForm:FormGroup;
  constructor(public dialogRef: MatDialogRef<ScheduleCampComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _main:MainService,
    private dialog:MatDialog,
    private router:Router,
    private formBuilder: FormBuilder,
    private sanitized: DomSanitizer,
    private toastr:ToastrService) { 
    this.phisingForm = this.formBuilder.group({});
    this.credsForm = this.formBuilder.group({});
    }

  ngOnInit(): void {
  }

}





