import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { CampaignConfirmComponent } from 'src/app/shared/campaign-confirm/campaign-confirm.component';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { RescheduleComponent } from 'src/app/shared/reschedule/reschedule.component';
import { MainService } from '../service/main.service';
export interface PeriodicElement {
  date: string;
  campaignName: string;
  time: string;
  timeZone: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { campaignName: '1', date: 'Hydrogen', time: '1.0079', timeZone: 'H' },
  { campaignName: '2', date: 'Helium', time: '4.0026', timeZone: 'He' },

];
@Component({
  selector: 'app-scheduled-campaigns',
  templateUrl: './scheduled-campaigns.component.html',
  styleUrls: ['./scheduled-campaigns.component.css']
})


export class ScheduledCampaignsComponent implements OnInit {
  displayedColumns: string[] = ['campaignName', 'time', 'actions'];
  dataSource = new MatTableDataSource([]);
  campaigns: any =[]
  StoreData: boolean = false;
  constructor(
    private commonService : CommonService,
    private router:Router,
    private _schedule: MainService, private toastr: ToastrService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
    this.commonService.setNavTitle('Scheduled Campaign');
    this.commonService.setScreenRouting('');
    this.scheduledCampaigns();
  }

  scheduledCampaigns() {
    const email = localStorage.getItem('email');
    let reqbody = {
      'email': email
    }
    this._schedule.scheduled(reqbody).subscribe((data) => {
      if (data) {
        this.dataSource = new MatTableDataSource(data);
      }
    }, err => {
      this.toastr.error("Error in loading data");
    })
  }
  onEdit(element: any) {
    const dialogRef = this.dialog.open(RescheduleComponent, {
      data: element,
    });
    localStorage.setItem('jobkey',element)
    // this.dialogRef.close();
  }
  onDelete(element: any) {

  const email = localStorage.getItem('email');
    let reqbody = {
      'email': email
    }

    let dataDialog = { title: 'Do you really want to delete this campaign?' };
    const dialogRef = this.dialog.open(CampaignConfirmComponent, {
      width: '500px',
      height: '315px', 
      data: dataDialog,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log(result)
      if(result==true)
      {
    this._schedule.scheduled(reqbody).subscribe((data)=>{
      if(data){
        
        this.campaigns=data;
        for(let ele of this.campaigns)
        {
          const jobkey = ele.scheduledJobKey
          console.log(ele.scheduledJobKey)
          let key = (element)
          let reqbody2 = {
            'jobKey': key
          }
          this._schedule.deleteschedule(reqbody2).subscribe((data)=>{
            if (data)
            {
              let dataDialog = { title: 'Campaign ReScheduled Successfully!' };
              this.dialog.open(ConfirmationModalComponent, {
                width: '400px',
                height:'200px',
                data: dataDialog
              });
            }
          },
            (err)=>{
              this.StoreData=true;
               if(err.status==200){
                 console.log('err',err);
               let dataDialog = { title: 'Campaign deleted Successfully!' };
                const dialogRef = this.dialog.open(ConfirmationModalComponent, {
                  width: '400px',
                  height:'200px',
                  data: dataDialog
                });
                dialogRef.afterClosed().subscribe(()=>{
                  this.router.navigate(['main/Admin']);
                })
              }
              else{
                
              }
            })
        }
  }
});
  } })
}
}