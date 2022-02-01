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


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.campaignId = params.get('id');
    });
    this.getCampaignDetails(this.campaignId);
  }
  getCampaignDetails(id:any){
    this._mainService.getCompaignDetails(id).subscribe((data)=>{
      console.log(data);
    })
  }

}
