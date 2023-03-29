import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-appraisal-dashboard',
  templateUrl: './appraisal-dashboard.component.html',
  styleUrls: ['./appraisal-dashboard.component.css']
})
export class AppraisalDashboardComponent implements OnInit {

  StoreData: boolean;
  color: ThemePalette;
  value;
  mode: ProgressSpinnerMode;
  sso: boolean;

  constructor(private commonService: CommonService) {
    this.StoreData = true;
    this.color = 'primary';
    this.value = 50;
    this.mode = 'indeterminate';
    this.sso = false;
  }

  async ngOnInit(): Promise<void> {
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
    await sleep(5000);
    this.StoreData = false
    this.sso = this.commonService.getClickBoolean()
    if (this.sso == null) {
      this.sso = true
    }
    window.onbeforeunload = function () { return "Your work will be lost."; };
  }

}
