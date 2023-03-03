import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { ClientDetails, CourseDetails, SimulationDetails } from '../employee-client.model';
import { EmployeeCsvService } from '../services/employee-csv.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  searchForm: FormGroup;
  userId : number;
  clientDetails : ClientDetails;
  screenSize : string;
  constructor(private commonService : CommonService,
    private formBuilder : FormBuilder,
    private router: ActivatedRoute,
    private employeeCsvService : EmployeeCsvService,
    private responsiveService : ResponsiveService,
    private toastr : ToastrService) { 
    this.searchForm = this.formBuilder.group({});
    this.userId = 0;
    this.clientDetails = {} as ClientDetails;
    this.screenSize = '';
  }

  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
    this.router.paramMap.pipe(take(1)).subscribe((params) =>{
      this.userId = Number(params?.get("id"));
    })
    this.getEmployeeCsvDetails();
    this
    this.searchForm = this.formBuilder.group({
      searchText : [''],
      filterType : ['']
    });
    this.checkScreenStatus();
    this.onResize();
  }

  applyFilter(){
    
  }
  getEmployeeCsvDetails(){
    this.employeeCsvService.getEmployeeCsvDetails(this.userId).pipe(take(1)).subscribe({
      next :(data) => {
        this.clientDetails = data;
      },
      error : (error)=>{
        this.toastr.error('Error while loading client details');
      }
    })
  }

  checkScreenStatus() : void {
    this.responsiveService.getScreenStatus().subscribe((screenSize : string) => {
      if (screenSize) {
        this.screenSize=screenSize;
      }
    });
  }

  isScreenSizeXs() : boolean{
    return this.screenSize === 'xs';
  }

  isScreenSizeSmall() : boolean{
    return this.screenSize === 'sm';
  }

  isScreenSizeMedium() : boolean{
    return this.screenSize === 'md';
  }

  onResize() : void{
    this.responsiveService.checkWidth();
  }
}
