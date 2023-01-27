import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { FormdataService } from '../service/formdata.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  constructor(  private shared: FormdataService) { }
  StoreData:boolean=true;
  color: ThemePalette = 'primary';
  value = 50;
  mode: ProgressSpinnerMode = 'indeterminate';
  sso: boolean;
  signin: boolean;
  async ngOnInit(): Promise<void> {
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
    await sleep(5000);
    this.StoreData=false
    this.sso=this.shared.getclick()
    if (this.sso==null)
    {
      this.sso=true
    }
    window.onbeforeunload = function() { return "Your work will be lost."; };
  }

}
