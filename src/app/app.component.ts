import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { ToastrService } from 'ngx-toastr';
import { InfomodalComponent } from './shared/infomodal/infomodal.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gift-project';

  constructor (private bnIdle: BnNgIdleService,private router:Router,private dialog:MatDialog, private toastr:ToastrService)
  {

  }
  ngOnInit(): void {
    //60 = 1 minute
    this.bnIdle.startWatching(10).subscribe((res) => {
      if (res && localStorage.getItem("email") !== null) {
        console.log('session expired');
        let dataDialog = { title: 'Your session is timed out please login again' };
        const dialogRef = this.dialog.open(InfomodalComponent, {
          width: '400px',
          height:'380px',
          data: dataDialog
        });
        localStorage.clear();
        this.router.navigate(['main/login']);
      }
    });
  }
}
