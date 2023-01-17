import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { imgconst } from '../shared/Constants/constants';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Output() sidenav: EventEmitter<any> = new EventEmitter();
  simulationlogo :string = '';
  logoutlogo : string = '';
  constructor(private _auth:AuthService) { }

  ngOnInit(): void {
    this.simulationlogo = imgconst.simulationlog
    this.logoutlogo = imgconst.logoutlog
  }
  getUser(){
    return localStorage.getItem('token');
  }
  toggle()
{
  this.sidenav.emit();
}

  Logout(){
    this._auth.logout();
  
  }
}
