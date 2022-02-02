import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../service/main.service';

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

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.campaignId = params.get('id');
    });
    this.getCampaignDetails(this.campaignId);
  }
  getCampaignDetails(id:any){
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
