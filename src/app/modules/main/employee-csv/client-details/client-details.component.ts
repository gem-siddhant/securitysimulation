import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
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
  username: string;
  backgroundColor: string;
  initials: string;
  initialemail : string;
  constructor(private commonService : CommonService,
    private formBuilder : FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router : Router,
    private employeeCsvService : EmployeeCsvService,
    private responsiveService : ResponsiveService,
    private toastr : ToastrService,
    private dialog : MatDialog) { 
    this.searchForm = this.formBuilder.group({});
    this.userId = 0;
    this.clientDetails = {} as ClientDetails;
    this.screenSize = '';
  }

  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
    this.commonService.setNavTitle('Employee');
    this.commonService.setScreenRouting('main/employee-csv/dashboard');
    this.activatedRouter.paramMap.pipe(take(1)).subscribe((params) =>{
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
    this.backgroundColor = this.getRandomColor();
  }

  getEmployeeCsvDetails() : void{
    this.employeeCsvService.getEmployeeCsvDetails(this.userId).pipe(take(1)).subscribe({
      next :(data) => {
        this.clientDetails = data;
        this.getInitials()
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

  deleteEmployee() : void{
    const alertTitle = "Do you want to delete the employee?"
    const alertDialogRef = this.dialog.open(AlertModalComponent, {
      width: '454px',
      data :  alertTitle
    });
    alertDialogRef.afterClosed().pipe(take(1)).subscribe({
      next : (alertDialogData)=>{
        if(alertDialogData.yesClicked){
          this.employeeCsvService.deleteEmployeeDetails(this.userId).pipe((take(1))).subscribe({
            next : (data)=>{
              this.opneConfirmationModal('Employee Deleted Successfully!');
            },
            error : (error)=>{
              this.toastr.error(error.error);
            }
          })
        }
      },
    })
  }

  opneConfirmationModal(confirmationTitle : string): void {
    let dataDialog = { title: confirmationTitle };
    let dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '513px',
      data: dataDialog,
    });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.router.navigate(['/main/employee-csv/dashboard']);
        },
      });
  }

  getRandomColor() {
    // const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b'];
    const colors = ['#38A3A5']
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
  }

  getInitials() {
    this.username = this.clientDetails.officialMailId
    const parts = this.username.split('.');
    console.log(parts)
    this.initialemail = parts.map(part => part[0]).join('').toUpperCase();
  }
}
