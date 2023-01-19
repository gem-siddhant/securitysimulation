import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MainService } from '../modules/main/service/main.service';
import { AuthService } from '../services/auth.service';
import { imgconst } from '../shared/Constants/constants';
import { ScheduleCampComponent } from '../shared/schedule-camp/schedule-camp.component';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Output() sidenav: EventEmitter<any> = new EventEmitter();
  simulationlogo: string = '';
  logoutlogo: string = '';
  campaigns: any
  constructor(private _auth: AuthService,
    private _schedule: MainService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.simulationlogo = imgconst.simulationlog
    this.logoutlogo = imgconst.logoutlog
  }
  getUser() {
    return localStorage.getItem('token');
  }
  toggle() {
    this.sidenav.emit();
  }

  Logout() {
    this._auth.logout();

  }
}
