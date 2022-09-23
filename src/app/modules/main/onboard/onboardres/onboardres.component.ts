import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { InfomodalComponent } from 'src/app/shared/infomodal/infomodal.component';
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
        this.name =  params['token'];
        this.email =  params['value'];
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
    'token':name,
    'value':email,
    'status':status
  }
  console.log(obj)
  this._mainService.senddetails(obj).subscribe((data:any)=>{
    if(data){
      console.log('data sent');

    }
  },
  (err)=>{ //link expired or request is already responded for the user.
  if(err.status==208)
  {
    let dataDialog = { title: 'Request is already taken care of' };
    const dialogRef = this.dialog.open(InfomodalComponent, {
      width: '513px',
      height: '350px',
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
