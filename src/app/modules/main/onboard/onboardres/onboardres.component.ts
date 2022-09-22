import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { MainService } from '../../service/main.service';

@Component({
  selector: 'app-onboardres',
  templateUrl: './onboardres.component.html',
  styleUrls: ['./onboardres.component.css']
})
export class OnboardresComponent implements OnInit {
  name:any;
  status: any;
  email:any;
  constructor(private route:ActivatedRoute,
    private dialog:MatDialog,
    private router:Router,
    private http:HttpClient,private _mainService:MainService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.name =  params['approver'];
        this.email =  params['email'];
        this.status = params['status'];
      }
    )
    console.log(this.name)
    console.log(this.email)
    console.log(this.status)
    this.sendapproverdata(this.name,this.email,this.status);
  }

sendapproverdata(name:any,email:any,status:any)
{
  let obj = {
    'approver':name,
    'email':email,
    'status':status
  }
  console.log(obj)
  this._mainService.senddetails(obj).subscribe((data:any)=>{
    if(data){
      console.log('data sent');

    }
  },
  (err)=>{
  if(err.status==208)
  {
    let dataDialog = { title: 'You have Already Been Onboarded!' };
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '513px',
      data: dataDialog
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.router.navigate(['main/add-campaign']);
    })
  }
}
  )
}
}
