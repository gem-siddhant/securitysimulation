import { Component, OnInit } from '@angular/core';
import { MainService } from '../service/main.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
campaigns:any;
  constructor(private _main:MainService) { }

  ngOnInit(): void {
    this.getAllCampaigns();
  }
  getAllCampaigns(){
    this._main.getAllCampaigns(localStorage.getItem('email')).subscribe((data)=>{
      if(data){
        console.log(data);
        this.campaigns=data;
      }
    })
  }
}
