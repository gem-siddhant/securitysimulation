import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-user-manual',
  templateUrl: './user-manual.component.html',
  styleUrls: ['./user-manual.component.css']
})
export class UserManualComponent implements OnInit {

  content: any
  constructor( private commonService : CommonService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
    this.commonService.setNavTitle('Manual');
    this.commonService.setScreenRouting('');
  }
  toogletag(content:any )
{
  this.toastr.show(content);
}

}
