import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ResponsiveService } from 'src/app/services/responsive.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  templateId : Number;
  constructor(
    private commonService : CommonService,
    private responsiveService : ResponsiveService,
    private router: ActivatedRoute,
  ) { 
    this.templateId = 0;
  }

  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
    this.router.paramMap.subscribe((params) =>{
      this.templateId = Number(params?.get("id"));
    })
  }

}
