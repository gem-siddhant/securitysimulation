import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  constructor() { }
  StoreData:boolean=true;
  color: ThemePalette = 'accent';
  value = 50;
  mode: ProgressSpinnerMode = 'indeterminate';
  async ngOnInit(): Promise<void> {
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
    await sleep(5000);
    this.StoreData=false
    window.onbeforeunload = function() { return "Your work will be lost."; };
  }

}
