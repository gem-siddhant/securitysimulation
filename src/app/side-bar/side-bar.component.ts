import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { imgconst } from '../shared/Constants/constants';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
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
  Logout(){
    this._auth.logout();
  
  }
}
