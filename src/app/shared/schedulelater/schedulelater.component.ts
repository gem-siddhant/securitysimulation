import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddCampaignService } from 'src/app/modules/main/service/add-campaign.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
@Component({
  selector: 'app-schedulelater',
  templateUrl: './schedulelater.component.html',
  styleUrls: ['./schedulelater.component.css']
})
export class SchedulelaterComponent implements OnInit {
  StoreData:boolean=true;
  DialogData:any;
  phisingForm: FormGroup;
  api_hit:boolean=true;
manager:any = "true";
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
    private _addCampaign:AddCampaignService,
    private dialog:MatDialog,private router:Router,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SchedulelaterComponent>,
    private toastr:ToastrService ){
      this.phisingForm = this.formBuilder.group({});
    }
  
  ngOnInit(): void {
    this.phisingForm = this.formBuilder.group(
      {
        date:[''],
        time:['']
      }
    )
  }

  schedulelater(){
    console.log(this.phisingForm.value.date)
    if(this.phisingForm.invalid)
    return;
    const formData :any= new FormData();
    let reqBody={
      
      'date':this.phisingForm.value.date,
      'time':this.phisingForm.value.time
    }
    
    let con = JSON.stringify(reqBody);
    formData.append("details",con);
    this.StoreData=false;
    this._addCampaign.schedulecampagin(formData).subscribe((data)=>{
      if(data){
        this.StoreData=true;
        let dataDialog = { title: 'Campaign Created Successfully!' };
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
          width: '513px',
          data: dataDialog
        });
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['main/dashboard']);
        })
      }
    },(err)=>{
      this.StoreData=true;
       if(err.status==200){
         console.log('err',err);
       let dataDialog = { title: 'Campaign Created Successfully!' };
        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
          width: '513px',
          data: dataDialog
        });
        dialogRef.afterClosed().subscribe(()=>{
          this.router.navigate(['main/dashboard']);
        })
      }
      else{
        this.toastr.error("Error in adding campaign.");
      }
    });
  }

}
