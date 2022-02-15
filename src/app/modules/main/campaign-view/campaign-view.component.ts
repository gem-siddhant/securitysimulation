import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../service/main.service';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginLabels from 'chartjs-plugin-labels';


@Component({
  selector: 'app-campaign-view',
  templateUrl: './campaign-view.component.html',
  styleUrls: ['./campaign-view.component.css']
})
export class CampaignViewComponent implements OnInit {
campaignId:any;
  constructor(private route: ActivatedRoute,
    private _router: Router,
    private _mainService:MainService) { }
readEmail:any=[];
openEmail:any=[];
allData:any=[];
pieChartOptions!: ChartOptions;
pieChartLabels!: Label[];
pieChartData!: SingleDataSet;
pieChartType!: ChartType;
pieChartLegend!: boolean;

pieChartPlugins:any = [];

  ngOnInit(): void {
    this.pieChartOptions = this.createOptions();
    this.pieChartLabels = ['Read', 'Delivered', 'Remaining'];
    this.pieChartData = [1, 2, 3];
    this.pieChartType = 'pie';
    this.pieChartLegend = true;
    this.pieChartPlugins = [pluginLabels];

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
  getCampaignDetails(id:any){
    this.readEmail=[];
    this.openEmail=[];
    this.allData=[];
    this._mainService.getCompaignDetails(id).subscribe((data)=>{
     if(data){
       this.allData=data.result;
        for(let element of data.result){

          if(element.read==true)
          {
            this.readEmail.push(element.email);
          }
          if(element.ipAddress){
            let obj={email:'',ip:''};
            obj.email=element.email;
            obj.ip=element.ipAddress;
            this.openEmail.push(obj);
          }
        }
     }
    })
  }

}
