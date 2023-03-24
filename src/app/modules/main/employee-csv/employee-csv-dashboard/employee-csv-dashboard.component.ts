import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { CsvUploadModalComponent } from 'src/app/shared/csv-upload-modal/csv-upload-modal.component';
import { EmployeeCsv, EmployeeExcelData, UpdateEmployeeCsv} from '../employee-client.model';
import { EmployeeCsvService } from '../services/employee-csv.service';

@Component({
  selector: 'app-employee-csv-dashboard',
  templateUrl: './employee-csv-dashboard.component.html',
  styleUrls: ['./employee-csv-dashboard.component.css'],
})
export class EmployeeCsvDashboardComponent implements OnInit {

  searchForm: FormGroup;
  employeeCsvTable: EmployeeCsv[];
  emailId : string;
  constructor(private commonService: CommonService, 
    private formBuilder : FormBuilder, 
    private employeeCsvService : EmployeeCsvService,
    private toastr : ToastrService,
    private dialog : MatDialog
  ) {
    this.searchForm = this.formBuilder.group({});
    this.employeeCsvTable = [] as EmployeeCsv[];
    this.emailId = '';
  }

  ngOnInit(): void {
    this.commonService.setLoginStatus(true);
    this.commonService.setNavTitle('Organization Data');
    this.commonService.setScreenRouting('');
    this.emailId = localStorage.getItem('email');
    this.getAllEmployees();
    this.searchForm = this.formBuilder.group({
      searchText : [''],
      filterType : ['']
    });
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
          this.getAllEmployees();
        },
      });
  }

  getAllEmployees(){
    this.employeeCsvService.getAllEmployees(this.emailId).pipe(take(1)).subscribe({
      next : (data)=>{
        this.employeeCsvTable = data;
      },
      error : (error)=>{
        this.toastr.error('Error while loading client details');
      }
    });
  }

  openUploadCsvModal(): void {
    let dialogRef: MatDialogRef<CsvUploadModalComponent>;
    dialogRef = this.dialog.open(CsvUploadModalComponent, {
      width: '513px',
    });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          if (data.sendClicked) {
            this.updateEmployeeCsv(data.employeeCsvData, data.onBoardEmployees, data.refreshEmployees);
          }
        }
      });
  }

  updateEmployeeCsv(employeeDetails: EmployeeExcelData[], onBoardEmployees : boolean, refreshEmployees : boolean): void {
    let csvData: UpdateEmployeeCsv = {} as UpdateEmployeeCsv;
    csvData.email = this.emailId;
    csvData.employeeDetails = employeeDetails;
    csvData.onboardEmployee = onBoardEmployees;
    csvData.refresh = refreshEmployees;
    this.employeeCsvService.updateEmployeesCsv(csvData).pipe(take(1)).subscribe({
      next: (data) => {
        this.opneConfirmationModal('Employees Added Successfully!');
      },
      error: (error) => {
        this.toastr.error(error.error);
      },
    });
  }

  deleteEmployee(userId : number) : void{
    const alertTitle = "Do you want to delete the employee?"
    const alertDialogRef = this.dialog.open(AlertModalComponent, {
      width: '454px',
      data :  alertTitle
    });
    alertDialogRef.afterClosed().pipe(take(1)).subscribe({
      next : (alertDialogData)=>{
        if(alertDialogData.yesClicked){
          this.employeeCsvService.deleteEmployeeDetails(userId).pipe((take(1))).subscribe({
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
}
