import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InfomodalComponent } from './shared/infomodal/infomodal.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gift-project';

  constructor (private router:Router,private dialog:MatDialog, private toastr:ToastrService)
  {

  }
  ngOnInit(): void {
    //60 = 1 minute

}
}
