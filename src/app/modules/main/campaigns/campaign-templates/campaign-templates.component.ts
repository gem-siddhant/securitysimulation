import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-campaign-templates',
  templateUrl: './campaign-templates.component.html',
  styleUrls: ['./campaign-templates.component.css'],
})
export class CampaignTemplatesComponent implements OnInit {

  screenSize : String;
  selectedTemplate : Number;
  
  constructor(
    private commonService : CommonService,
    private responsiveService : ResponsiveService,
    private router: Router,
  ) {
    this.screenSize = 'lg';
    this.selectedTemplate = -1;
   }

  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
    this.checkScreenStatus();
    this.onResize();
  }

  checkScreenStatus() : void {
    this.responsiveService.getScreenStatus().subscribe((screenSize : String) => {
      if (screenSize) {
        this.screenSize=screenSize;
      }
    });
  }

  isScreenSizeXs() : boolean{
    return this.screenSize === 'xs';
  }

  onResize() : void{
    this.responsiveService.checkWidth();
  }

  setSelectedTemplate(val : Number) : void{
    if(this.selectedTemplate === val)
      this.selectedTemplate = -1;
    else
      this.selectedTemplate = val;
  }

  isTemplateSelected() : boolean{
      return this.selectedTemplate !==-1;
  }

  navigateToTemplateForm() : void{
    if(this.selectedTemplate == 0){
      this.router.navigate(['/main/campaign/custom-form']);  
    }
    else{
      this.router.navigate(['/main/campaign/template-form',this.selectedTemplate]);
    }
  }

}
