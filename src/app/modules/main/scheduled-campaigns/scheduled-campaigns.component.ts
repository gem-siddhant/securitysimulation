import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from 'src/app/shared/delete-modal/delete-modal.component';
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
      'email': "ayush.tiwary@geminisolutions.com"
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
    const dialogRef = this.dialog.open(RescheduleCampaignModalComponent, {
      data: element,
    });
    console.log("Edit Works", element);
  }
  onDelete(element: any) {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: element,
    });
    console.log("Delete Works", element);
  }
}
