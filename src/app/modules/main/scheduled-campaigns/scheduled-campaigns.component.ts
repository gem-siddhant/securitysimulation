import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CampaignConfirmComponent } from 'src/app/shared/campaign-confirm/campaign-confirm.component';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
import { RescheduleComponent } from 'src/app/shared/reschedule/reschedule.component';
import { RescheduleCampaignModalComponent } from '../reschedule-campaign-modal/reschedule-campaign-modal.component';
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
  displayedColumns: string[] = ['campaignName', 'date', 'time', 'timeZone', 'actions'];
  dataSource = new MatTableDataSource([]);
  constructor(private _schedule: MainService, private toastr: ToastrService, public dialog: MatDialog) { }

  ngOnInit(): void {
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
  }
  onDelete(element: any) {
    let dataDialog = { title: 'Do you really want to delete this campaign??' };
    const dialogRef = this.dialog.open(CampaignConfirmComponent, {
      width: '500px',
      height: '315px', 
      data: dataDialog,
    });
  }
}
