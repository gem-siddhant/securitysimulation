import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../service/main.service';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginLabels from 'chartjs-plugin-labels';
import {view_data} from './view.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-campaign-view',
  templateUrl: './campaign-view.component.html',
  styleUrls: ['./campaign-view.component.css']
})
export class CampaignViewComponent implements OnInit {
campaignId:any;
  constructor(private route: ActivatedRoute,
    private _router: Router,
    private _mainService:MainService) {
  this.viewData={id:0,email:'',ipAddress:'',status:''};
    }
    nameCampaign:any;
    emailSubject:any;
    desc:any;
clicked_len:any;
read_len:any;
delivered_len:any;
pieChartOptions!: ChartOptions;
pieChartLabels!: Label[];
pieChartData!: SingleDataSet;
pieChartType!: ChartType;
pieChartLegend!: boolean;
viewData:view_data;
select_val:any='';
dataSource:any;
displayedColumns: string[] = ['sno','email', 'ip' , 'status'];
pieChartPlugins:any = [];
@ViewChild(MatSort, { static: true }) sort!: MatSort;
  ngOnInit(): void {
    this.pieChartOptions = this.createOptions();
    this.pieChartLabels = ['Clicked', 'Read','Delivered'];
    this.pieChartType = 'pie';
    this.pieChartLegend = true;
    this.pieChartPlugins = [pluginLabels];
    this.dataSource = new MatTableDataSource<view_data>([]);
    this.route.paramMap.subscribe((params: any) => {
      this.campaignId = params.get('id');
    });
    this.getCampaignDetails(this.campaignId);
  }
  private createOptions(): ChartOptions {
    return {
      responsive: true,
          maintainAspectRatio: true,
          plugins: {
              labels: {
                render: 'percentage',
                fontColor: ['green', 'white', 'red'],
                precision: 2
              }
          },
    };
  }
  filterDrop(){
    console.log(this.select_val);
    let filterValue=this.select_val;
       filterValue = filterValue.trim();
     filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
     this.dataSource.filter = filterValue;

  }
  applyFilter(event: any) {
    let  filterValue=event.target.value;
     filterValue = filterValue.trim(); // Remove whitespace
     filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
     this.dataSource.filter = filterValue;
   }
   sortData(sort: MatSort) {
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
      if (typeof data[sortHeaderId] === 'string') {
        return data[sortHeaderId].toLocaleLowerCase();
      }
      return data[sortHeaderId];
    }
  }
  getCampaignDetails(id:any){

    this._mainService.getCompaignDetails(id).subscribe((data)=>{
     if(data){
       this.clicked_len=data.openedCount;
       this.delivered_len=data.deliveredCount;
       this.read_len=data.readCount;
       this.nameCampaign=data.template.heading;
       this.emailSubject=data.template.subject;
       this.desc=data.template.description;
       let i=1;
       for(let element of data.result){
         element.id=i;
         if(!element.ipAddress){
          element.ipAddress='NA';
         }

        ++i;
       }

        this.pieChartData = [this.clicked_len, this.read_len,this.delivered_len];
        this.dataSource = new MatTableDataSource<view_data>(data.result);
        this.dataSource.sort = this.sort;
     }
    })
  }

}
