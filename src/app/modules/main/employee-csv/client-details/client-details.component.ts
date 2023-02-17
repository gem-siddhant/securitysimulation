import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  searchForm: FormGroup;
  constructor(private commonService : CommonService,private formBuilder : FormBuilder) { 
    this.searchForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
    this.searchForm = this.formBuilder.group({
      searchText : [''],
      filterType : ['']
    });
  }

  applyFilter(){
    
  }

}
